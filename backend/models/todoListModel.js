const mysql = require("mysql2");
const dbConfig = require("../dbConfig");

const connection = mysql.createConnection(dbConfig);

const TodoList = {
  getAllTodoLists: (callback) => {
    connection.query("SELECT * FROM todolists", callback);
  },
  getTodolistsByUserId: (userId, callback) => {
    const sql = "SELECT * FROM todolists WHERE id_user = ?"; // sélectionnez les todolistes par id utilisateur
    connection.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des todolistes :", err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
  getTodolistsId: (id, callback) => {
    const sql = "SELECT * FROM todolists WHERE id = ?"; // sélectionnez les todolistes par id
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération de la todolistes :", err);
        callback(err, null);
      } else if (results.length === 0) {
        const error = new Error("la todo n'est existe pas .");
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },
  updateTodo: (userId, updatedTodoData, callback) => {
    const { titre, description, statut } = updatedTodoData;

    const sql =
      "UPDATE todolists SET titre = ?, description = ?, statut = ? WHERE id = ?";
    connection.query(
      sql,
      [titre, description, statut, userId],
      (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de la mise à jour de l'utilisateur dans la base de données :",
            err
          );
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  createTodo: (userId, titre, description, statut, callback) => {
    const sql =
      "INSERT INTO todolists (id_user, titre, description, statut) VALUES (?, ?, ?, ?)";
    connection.query(
      sql,
      [userId, titre, description, statut],
      (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de l'insertion de la tâche dans la to-do list :",
            err
          );
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  deleteTodo: (id, callback) => {
    const sql = "DELETE FROM todolists WHERE id =?";

    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la suppression de la todolist dans la base de données :",
          err
        );
        callback(err, null);
      } else if (result.affectedRows === 0) {
        const error = new Error(
          "Aucune todo supprimée, car elle n'existe pas."
        );
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = TodoList;
