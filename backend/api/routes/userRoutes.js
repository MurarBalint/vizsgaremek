const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const paramHandler = require("../midldewares/paramHandler")


router.param("userId", paramHandler.paramUserId);
router.param("paramPage", paramHandler.paramPage);


router.get("/users", userController.getUsers);

router.get("/users/:paramPage", userController.getUsersByPage);

router.delete("/user/:userId", userController.deleteUser);

router.post("/user", userController.createUser);

router.patch("/user/:userId", userController.updateUser);

module.exports = router;
