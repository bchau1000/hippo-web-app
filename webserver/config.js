require('dotenv').config();
const mysql = require('mysql');

// process.env values configured in config.env file
const config = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'study_buddy_db',
  multipleStatements: true,
};

const pool = mysql.createPool(config);

module.exports = pool;