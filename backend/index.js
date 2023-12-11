const express = require("express");
const UserController = require("./controllers/userController");
const TodoListController = require("./controllers/todoListController");

const app = express();
const port = 3000;

app.get("/users", UserController.getAllUsers);
app.get("/todolists", TodoListController.getAllTodoLists);

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
