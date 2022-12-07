"use strict";

const repository = require("../repositories/cars.repository");
const exportModule = {};

exportModule.carList = async () => {
  try {
    let where = {
      deletedAt: null,
    };
    return await repository.getAll(where);
  } catch (error) {
    throw error;
  }
};

exportModule.oneCarById = async (id) => {
  try {
    if (id === undefined) throw "Mobil id tidak defined!";
    let where = {
      deletedAt: null,
    };
    return await repository.getOne({ ...where, id: id });
  } catch (error) {
    throw error;
  }
};

exportModule.insertCar = async (user, data) => {
  try {
    if (user === undefined) throw "User tidak defined!";
    if (data === undefined) throw "Data mobil tidak defined!";
    return await repository.insertOne({ ...data, createdBy: user.id });
  } catch (error) {
    throw error;
  }
};

exportModule.updateCarById = async (user, data, id) => {
  try {
    if (user === undefined) throw "User tidak defined!";
    if (data === undefined) throw "Data mobil tidak defined!";
    if (id === undefined) throw "Mobil id tidak defined!";
    return await repository.update({ ...data, updatedBy: user.id }, { id: id });
  } catch (error) {
    throw error;
  }
};

exportModule.deleteCar = async (user, id) => {
  try {
    if (user === undefined) throw "User tidak defined!";
    if (id === undefined) throw "Mobil id tidak defined!";
    let data = {
      deletedAt: new Date(),
      deletedBy: user.id,
    };
    return await repository.update(data, { id: id });
  } catch (error) {
    throw error;
  }
};

module.exports = exportModule;
