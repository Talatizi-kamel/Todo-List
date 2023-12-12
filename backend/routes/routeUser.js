const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/users", UserController.getAllUsers);
router.get("/users/profile", authMiddleware, UserController.getUser);
router.post("/users/signin", UserController.signin);
router.post("/users/login", UserController.login);

module.exports = router;
