const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = mysql.createPool({
  host: process.env.HOSTNAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'Trybeer',
  port: '3306',
});