const mysql = require("mysql2");
const dbConfig = require("../dbConfig");

const connection = mysql.createConnection(dbConfig);

const User = {
  getAllUsers: (callback) => {
    connection.query("SELECT * FROM users", callback);
  },

  signin: (userData, callback) => {
    const { nom, prenom, email, password } = userData;

    // je vérifie d'abord si l'e-mail existe déjà dans la base de données
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la vérification de l'e-mail :", err);
          callback(err, null);
        } else if (results.length > 0) {
          const error = new Error("L'utilisateur avec cet e-mail existe déjà.");
          callback(error, null);
        } else {
          const sql =
            "INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)";
          connection.query(
            sql,
            [nom, prenom, email, password],
            (insertErr, result) => {
              if (insertErr) {
                console.error(
                  "Erreur lors de l'insertion de l'utilisateur dans la base de données :",
                  insertErr
                );
                callback(insertErr, null);
              } else {
                callback(null, result);
              }
            }
          );
        }
      }
    );
  },
  getUserByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur par e-mail :",
          err
        );
        callback(err, null);
      } else {
        callback(null, results[0]); // renvoie le premier utilisateur trouvé
      }
    });
  },
};

module.exports = User;
