require('dotenv').config();
const mysql = require('mysql');

// process.env values configured in config.env file
const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
};

const pool = mysql.createPool(config);

module.exports = pool;