"use strict";

const express = require("express");
const router = express.Router();

const carsControl = require("../controllers/cars.controller");

router.get("/", carsControl.getAll);

router.get("/:id", carsControl.getOne);

router.post("/", carsControl.insertOne);

router.put("/:id", carsControl.updateFull);

router.patch("/:id", carsControl.updatePartially);

router.delete("/:id", carsControl.delete);

module.exports = router;
