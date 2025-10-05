const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    const User = require("./User")(sequelize, DataTypes);

    return { User };
};