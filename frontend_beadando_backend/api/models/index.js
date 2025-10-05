const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    const User = require("./User")(sequelize, DataTypes);
    const User_Profiles = require("./User_Profiles")(sequelize, DataTypes);


    User.hasOne(User_Profiles, {
        foreignKey: "USER_ID",
        as: "profile"
    });

    User_Profiles.belongsTo(User, {
        foreignKey: "USER_ID",
        as: "user"
    });

    return { User, User_Profiles };
};