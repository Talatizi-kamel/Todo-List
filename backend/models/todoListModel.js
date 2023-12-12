const mysql = require("mysql2");
const dbConfig = require("../dbConfig");

const connection = mysql.createConnection(dbConfig);

const TodoList = {
  getAllTodoLists: (callback) => {
    connection.query("SELECT * FROM todolists", callback);
  },
  getTodolistsByUserId: (userId, callback) => {
    const sql = "SELECT * FROM todolists WHERE id_user = ?"; // Sélectionnez les todolistes par ID utilisateur
    connection.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des todolistes :", err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};

module.exports = TodoList;
