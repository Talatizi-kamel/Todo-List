const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoListController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/todolists", authMiddleware, TodoController.getTodolists);
router.post("/todolists/insert", authMiddleware, TodoController.createTodo);
router.put("/todolists/:id", authMiddleware, TodoController.updateTodo);
router.delete("/todolists/:id", authMiddleware, TodoController.deleteTodo);
router.get("/todolists/:id", authMiddleware, TodoController.getTodolist);

module.exports = router;
