const UserModel = require("../models/userModel");
const mysql = require("mysql2");

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
  signin: (req, res, next) => {
    const userData = req.body;

    UserModel.signin(userData, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur serveur :" + err.message });
      } else {
        res.status(201).json({ message: "Utilisateur inscris avec succès" });
      }
    });
  },

  login: (req, res, next) => {
    const { email, password } = req.body;

    UserModel.getUserByEmail(email, (err, user) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else if (!user) {
        res.status(401).json({ error: "Adresse e-mail non trouvée" });
      } else if (user.password !== password) {
        res.status(401).json({ error: "Mot de passe incorrect" });
      } else {
        res.status(200).json({ message: "Connexion réussie" });
      }
    });
  },
};

module.exports = UserController;
