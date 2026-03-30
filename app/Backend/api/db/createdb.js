require("dotenv").config({ quiet: true, path: "../../.env" });


const mysql = require("mysql2");

try {
    console.log("Creating DB");
    
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306,
    });

    connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``)
    console.log("DB ok");

}
catch (error) {
    console.error(error);

}
console.log("Sikeres DB készitése ki léphetsz!");
