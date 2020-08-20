const { Sequelize } = require('sequelize');

const db = 'app';
const username = 'gitpod';
const password = '';

const sequelize = new Sequelize(db, username, password, {
  host: 'localhost',
  dialect:'mysql'
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }
   return sequelize;
}

module.exports = {
    connect, sequelize
};
