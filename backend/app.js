const express = require("express")
const app = express()

// const errorHandler = require("./api/midldewares/errorHandler")
const userRoutes = require("./api/routes/userRoutes")
require("./api/db/")

app.use("/users", userRoutes)

// app.use(errorHandler)

module.exports = app