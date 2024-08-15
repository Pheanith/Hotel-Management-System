const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel-system', 
  port: 3306
});


module.exports = db;