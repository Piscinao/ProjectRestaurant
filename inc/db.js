const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zmtprfqo',
  database: 'restaurantDB'
});

module.exports = connection;