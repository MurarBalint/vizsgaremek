const { Model } = require("sequelize") 

module.exports = (sequelize, DataTypes) =>
{
    class User extends Model { } 

    
    User.init
    (
        {
            ID: 
            {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            email:
            {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            password_hash:
            {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            username: 
            {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            role:
            {
                type: DataTypes.ENUM("user", "admin"),
                allowNull: true,
                defaultValue: "user"
            },

            is_active:
            {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 1
            },

            last_login:
            {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }

            
        },

        {
            sequelize,
            modelName: "Users",
            freezeTableName: true,
            createdAt: "created_at", 
            updatedAt: "updated_at", // ez meg valtozni fog

            indexes:
            [
                {
                    unique: true,
                    fields: ["email", "username"]
                }
            ]
           
        }
    )

    return User
}