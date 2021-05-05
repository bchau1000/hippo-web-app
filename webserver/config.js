require('dotenv').config();
const mysql = require('mysql');

// process.env values configured in config.env file
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'study_buddy_db',
  multipleStatements: true,
};

const pool = mysql.createPool(config);

module.exports = pool;