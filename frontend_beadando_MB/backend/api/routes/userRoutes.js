const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getUsers);

router.param("userId", (req, res, next, userId) => 
{
    req.userId = userId;

    next();
});
router.get("/user/:userId", userController.getUserById)

router.post("/user", userController.createUser);


module.exports = router;