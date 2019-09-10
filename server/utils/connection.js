const mysql = require('mysql');
const config = require("../configs/db-config");
const pool = mysql.createPool(config);
const connection = mysql.createConnection(config);

module.exports = {
  connection,
  pool,
}