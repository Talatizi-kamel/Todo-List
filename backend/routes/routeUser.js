const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/users", UserController.getAllUsers);
router.post("/users/signin", UserController.signin);
router.post("/users/login", UserController.login);

module.exports = router;
