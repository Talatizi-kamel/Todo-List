const express = require("express");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/routeUser");
const TodoListRoutes = require("./routes/routeTodoList");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", UserRoutes);
app.use("/api", TodoListRoutes);

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
