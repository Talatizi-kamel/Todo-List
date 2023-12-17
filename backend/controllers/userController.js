const UserModel = require("../models/userModel");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const UserController = {
  getAllUsers: (req, res, next) => {
    UserModel.getAllUsers((err, users) => {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(users);
      }
    });
  },
  getUser: (req, res, next) => {
    const userId = req.user.id;
    UserModel.getUser(userId, (err, users) => {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(users);
      }
    });
  },
  updateUser: (req, res, next) => {
    const userId = req.user.id;
    const updatedUserData = req.body;

    UserModel.updateUser(userId, updatedUserData, (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json({ message: "Utilisateur mis à jour avec succès" });
      }
    });
  },
  signin: (req, res, next) => {
    const userData = req.body;

    UserModel.signin(userData, (err, result) => {
      if (err) {
        //console.error("Erreur lors de l'inscription de l'utilisateur :", err);
        res.status(400).json(" " + err.message);
      } else {
        res.status(201).json({ message: "Utilisateur inscris avec succès" });
      }
    });
  },

  login: (req, res, next) => {
    const { email, password } = req.body;

    UserModel.getUserByEmail(email, (err, { hashedPassword, token }) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else if (!hashedPassword) {
        res.status(401).json({ error: "Adresse e-mail non trouvée" });
      } else {
        bcrypt.compare(
          password,
          hashedPassword,
          (compareErr, passwordMatch) => {
            if (compareErr) {
              console.error(
                "Erreur lors de la comparaison des mots de passe :",
                compareErr
              );
              res.status(500).json({ error: "Erreur serveur" });
            } else if (!passwordMatch) {
              res.status(401).json({ error: "Mot de passe incorrect" });
            } else {
              res.cookie("token", token, { httpOnly: true });
              res.status(200).json({ message: "Connexion réussie", token });
            }
          }
        );
      }
    });
  },
};

module.exports = UserController;
