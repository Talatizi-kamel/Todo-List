const mysql = require("mysql2");
const dbConfig = require("../dbConfig");

const connection = mysql.createConnection(dbConfig);

const TodoList = {
  getAllTodoLists: (callback) => {
    connection.query("SELECT * FROM todolists", callback);
  },
};

module.exports = TodoList;
