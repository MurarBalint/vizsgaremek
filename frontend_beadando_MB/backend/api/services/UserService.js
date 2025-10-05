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

    async getUserById(paramId)
    {
        return await this.userRepository.getUserById(paramId);
    };

    async createUser(userData)
    {
        if(!userData) throw new BadRequestError("Missing user data from payload", 
        {
            data: userData,
        });

        if(!userData.email) throw new BadRequestError("Missing email from payload",
        {
            data: userData,
        });

        if(!userData.password) throw new BadRequestError("Missing password from payload", 
        {
            data: userData,
        });

        if(!userData.username) throw new BadRequestError("Missing username from payload", 
        {
            data: userData,
        });

        return await this.userRepository.createUser(userData);
    }
};

module.exports = UserService;