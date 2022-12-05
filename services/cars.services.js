"use strict";

const repository = require("../repositories/cars.repository");
const exportModule = {};

exportModule.oneUserEmail = async (email) => {
  try {
    if (email === undefined) throw "User tidak terdaftar!";
    return await repository.getOne({ email: email });
  } catch (error) {
    throw error;
  }
};

exportModule.insertUser = async (data) => {
  try {
    if (data === undefined) throw "Data tidak ditemukan!";
    return await repository.insertOne(data);
  } catch (error) {
    throw error;
  }
};
