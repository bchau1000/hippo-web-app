var mysql = require('mysql');

const config = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "study_buddy_db"
};

const pool = mysql.createPool(config);

module.exports = pool;