const { raw } = require("mysql2");
const { DbError } = require("../errors");

class UserRepository {
    constructor(db) {
        this.User = db.User;
        this.User_Profiles = db.User_Profiles;
        this.sequelize = db.sequelize;
    }

    async getUsers() {
        try {
            return await this.User.findAll({
                attributes: ["ID", "email", "password_hash", "username", "role", "is_active", "created_at", "last_login"],
            });
        } catch (error) {
            throw new DbError("Failed to fetch users", { details: error.message });
        }
    }

    async getUser_Profiles() {
        try {
            return await this.User_Profiles.findAll({
                attributes: ["USER_ID", "display_name", "birthdate", "birth_place", "schools", "bio", "avatar_url"],
            });
        } catch (error) {
            throw new DbError("Failed to fetch user profiles", { details: error.message });
        }
    }

    async getUsersByPage(page) {
        const limit = 25;
        const offset = (page - 1) * limit;
        try {
            return await this.User.findAll({
                attributes: ["ID", "email", "password_hash", "username", "role", "is_active", "created_at", "last_login"],
                limit,
                offset,
                order: [["ID", "ASC"]],
            });
        } catch (error) {
            throw new DbError("Rossz paraméter", { details: error.message });
        }
    }

    async getUser_ProfilesByPage(page) {
        const limit = 25;
        const offset = (page - 1) * limit;
        try {
            return await this.User_Profiles.findAll({
                attributes: ["USER_ID", "display_name", "birthdate", "birth_place", "schools", "bio", "avatar_url"],
                limit,
                offset,
                order: [["USER_ID", "ASC"]],
            });
        } catch (error) {
            throw new DbError("Rossz paraméter", { details: error.message });
        }
    }

    async userDelete(userId) {
        try {
            const deletedRow = await this.User.destroy({ where: { ID: userId } });

            if (deletedRow === 0) {
                throw new DbError("Nincs ilyen user", { details: `userId: ${userId}` });
            }

            return { success: true, deleted: deletedRow };
        } catch (error) {
            throw new DbError("Sikertelen törlés", { details: error.message });
        }
    }

    async createUser(userData) {
        try {
            return await this.User.create(userData);
        } catch (error) {
            throw new DbError("Failed to create user object", {
                details: error.message,
                data: userData,
            });
        }
    }

    async updateUser(userId, updateData) {
        try {
            const [affectedRows] = await this.User.update(updateData, {
                where: { ID: userId },
            });

            if (affectedRows === 0) {
                throw new DbError("Felhasználó nem található", { details: `userId: ${userId}` });
            }

            // findOne a primary key mezőre
            const updatedUser = await this.User.findOne({ 
                where: { ID: userId },
                raw: true 
            });
            
            if (!updatedUser) {
                throw new DbError("A frissített user nem található", { details: `userId: ${userId}` });
            }

            return updatedUser;
        } catch (error) {
            throw new DbError("Sikertelen frissítés", { details: error.message });
        }
    }

}

module.exports = UserRepository;
