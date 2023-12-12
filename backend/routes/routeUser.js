const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.signin);

module.exports = router;
