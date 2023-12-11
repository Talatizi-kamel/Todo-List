const UserModel = require("../models/userModel");

const UserController = {
  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, users) => {
      if (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(users);
      }
    });
  },
  // Autres méthodes du contrôleur utilisateur...
};

module.exports = UserController;
