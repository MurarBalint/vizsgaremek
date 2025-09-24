const UserRepository = require("../repositories/UserRepository")

class UserService
{
    constructor(dbParam)
    {
        this.userRepository = new UserRepository(dbParam)

    }

    async getUsers()
    {
        return await this.personrepository.getUsers()
    }
}

module.exports = UserService