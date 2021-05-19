require('dotenv').config();
const mysql = require('mysql');

// process.env values configured in config.env file
const config = {
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'bee76e1eaa5928',
  password: '0d12aea4',
  database: 'heroku_12744ef9b4aeebc',
  multipleStatements: true,
};

const pool = mysql.createPool(config);

module.exports = pool;