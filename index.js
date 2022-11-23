// Node Modules
const express = require("express");
const formidableMiddleware = require("express-formidable");
const { PORT = 8000 } = process.env;

// Custom Modules
const cars = require("./routers/cars");

// Init
const app = express();
app.use(formidableMiddleware());

// Routing
app.use("/api/cars", cars);

app.listen(PORT);
