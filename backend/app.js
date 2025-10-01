const cors = require("cors");  // (le kell tolteni -- npm install cors)

const express = require("express");

const app = express();

const api = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors()); // ez engedélyezi az összes origin-t, azaz bárhonnan jöhet kérés


const userRoutes = require("./api/routes/userRoutes");

const errorHandler = require("./api/midldewares/errorHandler");



require("./api/db/");

app.use("/api", api);

api.use("/", userRoutes);

api.use(errorHandler.notFound);

app.use(errorHandler.showError);

app.use(errorHandler.notFound);

module.exports = app;