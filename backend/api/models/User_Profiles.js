const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) =>
{
    class User_Profiles extends Model {
        static associate(models) {
      // Fordított kapcsolat User-hez
      User_Profiles.belongsTo(models.User, { foreignKey: 'USER_ID', as: 'user' });
    }
    } 

    User_Profiles.init
    (
        {
            USER_ID: 
            {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false
            },

            display_name:
            {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            birthdate:
            {
                type: DataTypes.DATE,
                allowNull: true
            },

            birth_place:
            {
                type: DataTypes.STRING(255),
                allowNull: true
            },

            schools:
            {
                type: DataTypes.TEXT,
                allowNull: true
            },

            bio:
            {
                type: DataTypes.TEXT,
                allowNull: true
            },

            avatar_url:
            {
                type: DataTypes.TEXT,
                allowNull: true
            },

            created_at:
            {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },

        {
            sequelize,
            modelName: "Users_Profile",
            freezeTableName: true,
            // createdAt: false,
            createdAt: "created_at", 
            updatedAt: false
        }
    )

    return User_Profiles
}