const { DbError } = require("../errors");

class UserRepository
{
    constructor(db)
    {
        this.User = db.User;
        this.User_Profiles = db.User_Profiles;

        this.sequelize = db.sequelize;
    };

    async getUsers()
    {
        try
        {
            return await this.User.findAll(
            {
                attributes: [ "ID", "email", "password", "username", "role", "is_active", "created_at"],
            });
        }
        catch(error)
        {
            throw new DbError("Failed to fetch users", 
            {
                details: error.message,
            });
        }
    };

    async getUserById(paramId)
    {
        try
        {
            return await this.User.findOne(
            {
                where:
                {
                    ID: paramId,
                }
            });
        }
        catch(error)
        {
            throw new DbError("Failed to fetch user", 
            {
                details: error.message,
                data: paramId,
            });
        }
    };

    async createUser(userData)
    {
        try
        {
            return await this.User.create(userData);
        }
        catch(error)
        {
            throw new DbError("Failed to create user object", 
            {
               details: error.message,
               data: userData, 
            });
        }
    }
};

module.exports = UserRepository;