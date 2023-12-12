const express = require("express");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/routeUser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api", UserRoutes);

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
