const mysql = require("mysql2");
const dbConfig = require("../dbConfig");

const connection = mysql.createConnection(dbConfig);

const User = {
  getAllUsers: (callback) => {
    connection.query("SELECT * FROM users", callback);
  },
};

module.exports = User;
