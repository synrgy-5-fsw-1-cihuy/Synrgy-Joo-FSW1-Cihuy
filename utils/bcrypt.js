"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const exportModule = {};

exportModule.hash = (data) => {
  return bcrypt.hash(data, saltRounds);
};

exportModule.compare = (data, hashed) => {
  return bcrypt.compare(data, hashed);
};

module.exports = exportModule;
