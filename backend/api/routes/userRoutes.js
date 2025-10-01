const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getUsers);

router.get("/user_profiles", userController.getUser_Profiles);

module.exports = router;