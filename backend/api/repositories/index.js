const UserRepository = require("./UserRepository");
const User_ProfileRepository = require("./User_ProfileRepository");

module.exports = (db) =>
{
    const userRepository = new UserRepository(db);
    const user_profileRepository = new User_ProfileRepository(db);

    return { userRepository, user_profileRepository };
};