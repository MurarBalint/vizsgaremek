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

    async getUserById(paramId)
    {
        return await this.userRepository.getUserById(paramId);
    };

    async getUser_ProfilesById(paramId)
    {
        return await this.userRepository.getUser_ProfilesById(paramId);
    };

    async createUser(userData)
    {
        if(!userData) throw new BadRequestError("Missing user data from payload", 
        {
            data: userData,
        });

        if(!userData.email) throw new BadRequestError("Missing username from payload",
        {
            data: userData,
        });

        if(!userData.password_hash) throw new BadRequestError("Missing password from payload", 
        {
            data: userData,
        });

        if(!userData.username) throw new BadRequestError("Missing email from payload", 
        {
            data: userData,
        });

        if(!userData.role) throw new BadRequestError("Missing email from payload", 
        {
            data: userData,
        });



        // userData.password = bcrypt.hashSync(userData.password, salt);

        return await this.userRepository.createUser(userData);
    }
};

module.exports = UserService;