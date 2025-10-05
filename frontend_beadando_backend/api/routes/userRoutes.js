const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getUsers);

router.get("/user_profiles", userController.getUser_Profiles);


router.param("userId", (req, res, next, userId) => 
{
    req.userId = userId;

    next();
});
router.get("/user/:userId", userController.getUserById)

router.param("user_profilesId", (req, res, next, user_profilesId) => 
{
    req.user_profilesId = user_profilesId;

    next();
});
router.get("/user_profiles/:user_profilesId", userController.getUser_ProfilesById)

router.post("/user", userController.createUser);


module.exports = router;