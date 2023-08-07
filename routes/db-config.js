const sql = require('mysql');
const dotenv = require("dotenv").config();
const db = sql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Iop!1020',
    database: 'dbms'
});
module.exports = db;