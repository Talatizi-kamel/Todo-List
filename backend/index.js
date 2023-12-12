const express = require("express");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/routeUser");
const TodoListRoutes = require("./routes/routeTodoList");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", UserRoutes);
app.use("/api", TodoListRoutes);

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
