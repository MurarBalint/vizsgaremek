const { Model } = require("sequelize") 

module.exports = (sequelize, DataTypes) =>
{
    class User extends Model {} 

    User.init
    (
        {
            ID: 
            {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            last_name:
            {
                type: DataTypes.STRING(50),
                allowNull: false
            },

            first_name: 
            {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },

        {
            sequelize,
            modelName: "User",
            freezeTableName: true,
            createdAt: true,
            updatedAt: false
        }
    )

    return User
}