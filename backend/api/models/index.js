const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>
{
    const User = require("./User")(sequelize, DataTypes)
    const User_Profiles = require("./User_Profiles")(sequelize, DataTypes)


    if (User.associate) {
        User.associate({ User_Profiles });
    }
    if (User_Profiles.associate) {
        User_Profiles.associate({ User });
    }

    return { User, User_Profiles }
}