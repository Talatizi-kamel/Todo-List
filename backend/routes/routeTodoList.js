const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoListController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/todolists", authMiddleware, TodoController.getTodolists);
router.put("/todolists/:id", authMiddleware, TodoController.updateTodo);
router.post("/todolists/insert", authMiddleware, TodoController.createTodo);

module.exports = router;
