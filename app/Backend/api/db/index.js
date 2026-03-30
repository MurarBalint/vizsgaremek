const { Sequelize } = require("sequelize");
const seedAdminUser = require("./seedAdmin")
const mysql2 = require("mysql2/promise");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        logging: false
    }
);

(async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connection succesfull");
    }
    catch (error) {
        console.error("Database connection failed:", error);

        if (error?.message?.includes("Unknown database 'mihirunk_db'")) { 
            console.log("Trying to recreate database");

            const mysql = require("mysql2");

            try {
                const connection = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    port: process.env.DB_PORT || 3306,
                });

                connection.query(
                    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
                    (err) => {
                        if (err && err.code !== "ER_DB_CREATE_EXISTS") {
                            console.error("✗ Failed to create database:", err.message);
                        } else {
                            console.log(`✓ Database '${process.env.DB_NAME}' ready`);
                        }
                        connection.end();
                    }
                ).then(() => 
                {
                    try {
                        syncDb()
                    }
                    catch (error) {
                        console.error("database sync error:", error);
                    }
                });
                console.log("OK");
            } catch (error) {
                console.error("database creation error:", error);
            }
        }

    }
})().then(async () => 
{
    try {
        await syncDb()
    }
    catch (error) {
        console.error("database sync error:", error);
    }
});


const models = require("../models")(sequelize);

const db =
{
    sequelize,
    Sequelize,
    ...models
};

async function syncDb() {
    await db.sequelize.sync({ force: false });
    console.log("database sync OK");
    if (process.env.Seed == "true")
        await seedAdminUser(db);
}


module.exports = db;