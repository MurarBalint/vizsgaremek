const { BadRequestError } = require("../errors");
const bcrypt = require("bcrypt");
const salt = 14;

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

    async getUsersByPage(page)
    {
        return await this.userRepository.getUsersByPage(page);
    };

    async getUser_ProfilesByPage(page)
    {
        return await this.userRepository.getUser_ProfilesByPage(page);
    };

    async userDelete(userId)
    {
        return await this.userRepository.userDelete(userId);
    };

    async createUser(userData)
    {
        userData.password_hash = await bcrypt.hash(userData.password, salt);
        return await this.userRepository.createUser(userData);
    };

    async updateUser(userId, updateData) {
        if (!userId) throw new BadRequestError("Hiányzó user ID");
        if (!updateData || Object.keys(updateData).length === 0) {
            throw new BadRequestError("Hiányzó frissítési adatok");
        }
        return await this.userRepository.updateUser(userId, updateData);
    }

    
};

module.exports = UserService;