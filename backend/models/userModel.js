const mysql = require("mysql2");
const dbConfig = require("../dbConfig");

const connection = mysql.createConnection(dbConfig);

const User = {
  getAllUsers: (callback) => {
    connection.query("SELECT * FROM users", callback);
  },

  signin: (userData, callback) => {
    const { nom, prenom, email, password } = userData;

    // Vérifiez d'abord si l'e-mail existe déjà dans la base de données
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la vérification de l'e-mail :", err);
          callback(err, null);
        } else if (results.length > 0) {
          // Si des résultats sont renvoyés, cela signifie qu'un utilisateur avec cet e-mail existe déjà
          const error = new Error("L'utilisateur avec cet e-mail existe déjà.");
          callback(error, null);
        } else {
          // Si l'e-mail n'existe pas, procédez à l'insertion
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
};

module.exports = User;
