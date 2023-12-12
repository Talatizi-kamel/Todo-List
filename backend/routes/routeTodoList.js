// routeTodo.js
const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoListController");
const authMiddleware = require("../middleware/authMiddleware");

// Route pour récupérer les todolistes de l'utilisateur connecté
router.get("/todolists", authMiddleware, TodoController.getTodolists);

module.exports = router;
