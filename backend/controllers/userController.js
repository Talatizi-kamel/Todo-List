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
    // Récupérez les données du corps de la requête
    const userData = req.body;

    // Appel au modèle pour insérer l'utilisateur
    UserModel.signin(userData, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur serveur :" + err.message });
      } else {
        res.status(201).json({ message: "Utilisateur inscris avec succès" });
      }
    });
  },
};

module.exports = UserController;
