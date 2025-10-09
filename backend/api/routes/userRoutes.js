const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/users", userController.getUsers);
router.get("/user_profiles", userController.getUser_Profiles);


router.param("paramPage", (req, res, next, paramPage) => {
    req.paramPage = paramPage;
    next();
});

router.get("/users/:paramPage", userController.getUsersByPage);
router.get("/user_profiles/:paramPage", userController.getUser_ProfilesByPage);


router.param("userId", (req, res, next, userId) => {
    req.userId = userId;
    next();
});
router.delete("/user/:userId", userController.userDelete);


router.post("/user", userController.createUser);


router.patch("/user/:userId", userController.updateUser);

module.exports = router;
