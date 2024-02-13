const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'root';
const dbName = process.env.DB_NAME || 'alquiler_muebles';


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: process.env.DB_HOST || 'localhost',
  dialect: "mysql", 
});

module.exports = { sequelize, Sequelize };

