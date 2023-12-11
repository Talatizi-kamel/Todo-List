const TodoListModel = require("../models/todoListModel");

const TodoListController = {
  getAllTodoLists: (req, res) => {
    TodoListModel.getAllTodoLists((err, todoLists) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des listes de tâches :",
          err
        );
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.json(todoLists);
      }
    });
  },
};

module.exports = TodoListController;
