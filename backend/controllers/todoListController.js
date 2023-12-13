const TodoListModel = require("../models/todoListModel");

const TodoListController = {
  getTodolists: (req, res, next) => {
    const userId = req.user.id;

    TodoListModel.getTodolistsByUserId(userId, (err, todolists) => {
      if (err) {
        console.error("Erreur lors de la récupération des todolistes :", err);
        res.status(500).json({ error: "Erreur serveur " + err.message });
      } else {
        res.json(todolists);
      }
    });
  },
  getTodolist: (req, res, next) => {
    const id = req.params.id;

    TodoListModel.getTodolistsId(id, (err, todolists) => {
      if (err) {
        console.error("Erreur lors de la récupération de la todolistes :", err);
        res.status(500).json({ error: "Erreur serveur " + err.message });
      } else {
        res.json(todolists);
      }
    });
  },
  updateTodo: (req, res, next) => {
    const id = req.params.id;
    const updatedTodoData = req.body;

    TodoListModel.updateTodo(id, updatedTodoData, (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la todolist :", err);
        res.status(500).json({ error: "Erreur serveur " + err.message });
      } else {
        res.json({ message: "la todolist mis à jour avec succès" });
      }
    });
  },
  createTodo: (req, res, next) => {
    const userId = req.user.id; // Récupère l'ID de l'utilisateur à partir du token
    const { titre, description, statut } = req.body; // Informations de la nouvelle tâche

    TodoListModel.createTodo(
      userId,
      titre,
      description,
      statut,
      (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de l'insertion de la tâche dans la to-do list :",
            err
          );
          res.status(500).json({ error: "Erreur serveur" });
        } else {
          res.json({ message: "Tâche ajoutée avec succès" });
        }
      }
    );
  },
  deleteTodo: (req, res, next) => {
    const id = req.params.id;

    TodoListModel.deleteTodo(id, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de la todolist :", err);
        res.status(500).json({ error: "Erreur serveur " + err.message });
      } else {
        res.json({ message: "la todolist supprimée avec succès" });
      }
    });
  },
};

module.exports = TodoListController;
