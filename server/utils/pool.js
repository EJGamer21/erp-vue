const mysql = require('mysql');
const config = require("../configs/db-config");
const pool = mysql.createPool(config);

pool.getConnection((error, connection) => {
    if (error) throw error;
    if (connection) connection.release();
    return;
});

module.exports = pool;