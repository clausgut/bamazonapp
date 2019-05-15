var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:'bamazon'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
})