const mysql = require("mysql2");
const dbConfig = require("../dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = mysql.createConnection(dbConfig);

const User = {
  getAllUsers: (callback) => {
    connection.query("SELECT * FROM users", callback);
  },
  getUser: (id, callback) => {
    const sql = "SELECT nom,prenom,email FROM users WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des todolistes :", err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  signin: (userData, callback) => {
    const { nom, prenom, email, password } = userData;

    // Hash du mot de passe
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Erreur lors du hachage du mot de passe :", hashErr);
        callback(hashErr, null);
      } else {
        // je vérifie d abord si l email existe déjà dans la base de données
        connection.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          (err, results) => {
            if (err) {
              console.error(
                "Erreur lors de la vérification de l'e-mail :",
                err
              );
              callback(err, null);
            } else if (results.length > 0) {
              const error = new Error(
                "L'utilisateur avec cet e-mail existe déjà."
              );
              callback(error, null);
            } else {
              // Insertion de l'utilisateur avec le mot de passe haché
              const sql =
                "INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)";
              connection.query(
                sql,
                [nom, prenom, email, hashedPassword], // Utilisez le mot de passe haché
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
      }
    });
  },
  getUserByEmail: (email, callback) => {
    const sql = "SELECT id, password FROM users WHERE email = ?";
    connection.query(sql, [email], (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur par e-mail :",
          err
        );
        callback(err, null);
      } else {
        if (results.length === 1) {
          const { id, password } = results[0];
          const hashedPassword = password;

          //const jwtSecretKey = crypto.randomBytes(32).toString("hex"); // Génère une clé secrète de 32 octets
          //console.log(jwtSecretKey);

          const token = jwt.sign(
            { user: { id, email } },
            "762df87fa23a487a146eafe606c0657fad82008a027db6c9561d83cec273dd8c",
            {
              expiresIn: "1h",
            }
          );

          // retournez le mot de passe haché et le token
          callback(null, { hashedPassword, token });
        } else {
          callback(null, null);
        }
      }
    });
  },
};

module.exports = User;
