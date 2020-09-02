const database = require("./database.js");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const hbs = require("hbs");
const url = require("url");

// Routes
const apiRoutes = require('./api')

// Express setup
// view engine setup
let app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: ["mZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQe"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(require("flash")());
// end express

async function main() {
  let sequelize = await database.connect();

  // load in the models
  const ProductModel = require("./models/ProductModel");
  const TagModel = require("./models/TagModel");

  // setup relationship
  ProductModel.belongsToMany(TagModel, { through: "Product_Tags" });
  TagModel.belongsToMany(ProductModel, {
    through: "Product_Tags",
    as: "tags",
  });
  await sequelize.sync({ alter: true });

  app.use('/api', apiRoutes)

  app.listen(3000, () => {
    console.log("Server started");
  });
}

main();
