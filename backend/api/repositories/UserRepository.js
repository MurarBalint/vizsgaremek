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
                attributes: [ "ID", "email", "password_hash", "username", "role", "is_active", "created_at", "last_login"],
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

    async getUser_Profiles()
    {
        try
        {
            return await this.User_Profiles.findAll(
            {
                attributes: [ "USER_ID", "display_name", "birthdate", "birth_place", "schools", "bio", "avatar_url"],
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
};

module.exports = UserRepository;