class UserRepository
{
    constructor(dbParam)
    {
        this.User = dbParam.User
    }

    async getUsers()
    {
        return await this.User.findAll()
    }
}

module.exports = UserRepository