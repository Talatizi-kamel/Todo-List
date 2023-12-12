const TodoListModel = require("../models/todoListModel");

const TodoListController = {
  getTodolists: (req, res, next) => {
    const userId = req.user.id; 

    TodoListModel.getTodolistsByUserId(userId, (err, todolists) => {
      if (err) {
        console.error("Erreur lors de la récupération des todolistes :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(todolists);
      }
    });
  },
};

module.exports = TodoListController;
