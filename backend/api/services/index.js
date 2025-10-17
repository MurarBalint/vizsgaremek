const UserService = require("./UserService");
const User_ProfileService = require("./User_ProfileService");

module.exports = (db) =>
{
    const userService = new UserService(db);
    const user_profileService = new User_ProfileService(db);

    return { userService, user_profileService };
};