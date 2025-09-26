const express = require("express")
const cors = require("cors");  // (le kell tolteni -- npm install cors)
const app = express()


app.use(cors()); // ez engedélyezi az összes origin-t, azaz bárhonnan jöhet kérés

// const errorHandler = require("./api/midldewares/errorHandler")
const userRoutes = require("./api/routes/userRoutes")
require("./api/db/")

app.use("/users", userRoutes)

// app.use(errorHandler)

module.exports = app