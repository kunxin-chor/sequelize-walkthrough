const database = require("./database.js");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session')
const hbs = require('hbs')
const url=require("url");

// Express setup
// view engine setup
let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name:'session',
    keys:['mZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQe'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(require('flash')());
// end express


async function main() {
  let sequelize = await database.connect();
  
  const ProductModel = require('./models/ProductModel');
  const TagModel = require('./models/TagModel');
     
  ProductModel.belongsToMany(TagModel, { through:'Product_Tags'});
  TagModel.belongsToMany(ProductModel, {
        through:'Product_Tags',
        as: 'tags'
      }
  );
  await sequelize.sync({ alter: true});

  const product = await ProductModel.create({
      name:"ACME Hammer",
      quantity: 10,
      productCode:"HAM01"
  });

  const tag = await TagModel.create({
      name:"Tools"
  });

  const tag2 = await TagModel.create({
      name:"Discount"
  });

  product.addTag(tag, {
      through: {
          selfGranted:false
      }
  });

  product.addTag(tag2, {
      through: {
          selfGranted:false
      }
  });

  const result = await ProductModel.findOne({
      where: { name: 'ACME Hammer'},
      include: TagModel
  });
  
  let object = result.toJSON();
  console.log(object);


  app.listen(3000, ()=>{
    console.log("Server started")
  })
}

main();

