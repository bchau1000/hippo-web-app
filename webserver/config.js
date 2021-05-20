require('dotenv').config();
const mysql = require('mysql');

// process.env values configured in config.env file
const config = {
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'bf305b93cb4ed3',
    password: '265a4082',
    database: 'heroku_b29f437993fd7fa',
    multipleStatements: true,
};

const pool = mysql.createPool(config);

module.exports = pool;