const { BadRequestError, NotFoundError } = require("../errors");

const bcrypt = require("bcrypt");

class UserService
{
    constructor(db)
    {
        this.userRepository = require("../repositories")(db).userRepository;
    };

    async getUsers()
    {
        return await this.userRepository.getUsers();
    };

    async getUser_Profiles()
    {
        return await this.userRepository.getUser_Profiles();
    };
};

module.exports = UserService;