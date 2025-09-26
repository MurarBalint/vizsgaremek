const { Model } = require("sequelize") 

module.exports = (sequelize, DataTypes) =>
{
    class User extends Model {
        static associate(models) {
          // 1:1 kapcsolat User és User_Profiles között
          User.hasOne(models.User_Profiles, { foreignKey: 'USER_ID', as: 'profile' });
        }
    } 

    
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

            created_at:
            {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },

            last_login:
            {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }

            
        },

        {
            sequelize,
            modelName: "Users",
            freezeTableName: true,
            // createdAt: false,
            createdAt: "created_at", 
            // updatedAt: false,
            updatedAt: "last_login",

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