"use strict";

const cloudinaryConfig = require("../config/cloudinary");
const models = require("../models");
const carModel = models.cars;
const controller = {};

controller.getAll = async (req, res) => {
  let carData = await carModel.findAll({});

  res.json(carData);
  return;
};

controller.getOne = async (req, res) => {
  let params = req.params;

  let carData = await carModel.findOne({
    where: {
      id: params.id,
    },
  });

  if (carData == null) {
    res.end("Car was not found.");
    return;
  }

  res.json(carData);
  return;
};

controller.insertOne = async (req, res) => {
  let fields = req.fields;
  let files = req.files;

  if (fields.name == undefined || fields.rentPerDay == undefined || fields.capacity == undefined || files.image == undefined) {
    res.end("Data not complete.");
    return;
  }

  await cloudinaryConfig.uploader.upload(files.image.path, { folder: "cars" }, async (err, result) => {
    if (!!err) {
      res.end("Upload image failed.");
      return;
    }

    let data = {
      name: fields.name,
      rentPerDay: fields.rent_per_day,
      capacity: fields.capacity,
      image: result.secure_url,
    };

    await carModel.create(data);

    res.json(data);
    return;
  });
  return;
};

controller.updateFull = async (req, res) => {
  let fields = req.fields;
  let files = req.files;
  let params = req.params;

  if (fields.name == undefined || fields.rentPerDay == undefined || fields.capacity == undefined || files.image == undefined) {
    res.end("Data not complete.");
    return;
  }

  let carData = await carModel.findOne({
    where: {
      id: params.id,
    },
  });

  if (carData == null) {
    res.end("Car was not found.");
    return;
  }

  let filename = carData.image.split("/").at(-2) + "/" + carData.image.split("/").at(-1).split(".")[0];

  let data = {
    name: fields.name,
    rentPerDay: fields.rent_per_day,
    capacity: fields.capacity,
    image: result.secure_url,
  };

  await cloudinaryConfig.uploader.upload(files.image.path, { folder: "cars" }, async (err, result) => {
    if (!!err) {
      res.end("Upload image failed.");
      return;
    }

    data.image = result.secure_url;

    await carModel.update(data, {
      where: {
        id: params.id,
      },
    });

    await cloudinaryConfig.uploader.destroy(filename);

    res.json(data);
    return;
  });
  return;
};

controller.updatePartially = async (req, res) => {
  let fields = req.fields;
  let files = req.files;
  let params = req.params;

  let carData = await carModel.findOne({
    where: {
      id: params.id,
    },
  });

  if (carData == null) {
    res.end("Car was not found.");
    return;
  }

  let filename = carData.image.split("/").at(-2) + "/" + carData.image.split("/").at(-1).split(".")[0];

  let data = {};

  if (fields.name != undefined) {
    data.name = fields.name;
  }

  if (fields.rent_per_day != undefined) {
    data.rentPerDay = fields.rent_per_day;
  }

  if (fields.capacity != undefined) {
    data.capacity = fields.capacity;
  }

  if (files.image != undefined) {
    await cloudinaryConfig.uploader.upload(files.image.path, { folder: "cars" }, async (err, result) => {
      if (!!err) {
        res.end("Upload image failed.");
        return;
      }

      data.image = result.secure_url;

      await carModel.update(data, {
        where: {
          id: params.id,
        },
      });

      await cloudinaryConfig.uploader.destroy(filename);

      res.json(data);
      return;
    });
  } else {
    await carModel.update(data, {
      where: {
        id: params.id,
      },
    });

    res.json(data);
  }
  return;
};

controller.delete = async (req, res) => {
  let params = req.params;

  let carData = await carModel.findOne({
    where: {
      id: params.id,
    },
  });

  if (carData == null) {
    res.end("Car was not found.");
    return;
  }

  let filename = carData.image.split("/").at(-2) + "/" + carData.image.split("/").at(-1).split(".")[0];

  await carModel.destroy({
    where: {
      id: params.id,
    },
  });

  await cloudinaryConfig.uploader.destroy(filename);

  res.end("Success deleting car.");
  return;
};

module.exports = controller;
