"use strict";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const exportModule = {};

exportModule.sign = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "12h", algorithm: process.env.JWT_ALGORITHM });
};

module.exports = exportModule;
