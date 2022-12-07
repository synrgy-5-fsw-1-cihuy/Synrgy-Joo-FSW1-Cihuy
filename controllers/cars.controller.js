"use strict";

const cloudinaryConfig = require("../config/cloudinary");
const carService = require("../services/cars.services");
const controller = {};

controller.getAll = async (req, res) => {
  try {
    let data = await carService.carList();

    return res.status(200).json({
      message: "Mobil Tidak Ditemukan",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.getOne = async (req, res) => {
  try {
    let params = req.params;

    let data = await carService.oneCarById(params.id);

    if (data == null) {
      throw "Mobil Tidak Ditemukan.";
    }

    return res.status(200).json({
      message: "Mobil Berhasil Ditemukan",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.insertOne = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    if (fields.name == undefined || fields.rentPerDay == undefined || fields.capacity == undefined || files.image == undefined) {
      throw "Data Tidak Lengkap.";
    }

    let data = {
      name: fields.name,
      rentPerDay: fields.rentPerDay,
      capacity: fields.capacity,
    };

    await cloudinaryConfig.uploader.upload(files.image.path, { folder: "cars" }, async (err, result) => {
      if (!!err) {
        throw err;
      }

      data.image = result.secure_url;
    });

    await carService.insertCar(req.currentUser, data);

    return res.status(200).json({
      message: "Berhasil Input Mobil",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.updateFull = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;
    let params = req.params;

    if (fields.name == undefined || fields.rentPerDay == undefined || fields.capacity == undefined || files.image == undefined) {
      throw "Data Tidak Lengkap.";
    }

    let carData = await carService.oneCarById(params.id);

    if (carData == null) {
      throw "Mobil Tidak Ditemukan.";
    }

    let filename = carData.image.split("/").at(-2) + "/" + carData.image.split("/").at(-1).split(".")[0];

    let data = {
      name: fields.name,
      rentPerDay: fields.rentPerDay,
      capacity: fields.capacity,
    };

    await cloudinaryConfig.uploader.upload(files.image.path, { folder: "cars" }, async (err, result) => {
      if (!!err) {
        throw "Upload Gambar Gagal.";
      }

      data.image = result.secure_url;

      await cloudinaryConfig.uploader.destroy(filename);
    });

    await carService.updateCarById(req.currentUser, data, params.id);

    return res.status(200).json({
      message: "Berhasil Mengubah Mobil!",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.updatePartial = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;
    let params = req.params;

    let carData = await carService.oneCarById(params.id);

    if (carData == null) {
      throw "Mobil Tidak Ditemukan.";
    }

    let filename = carData.image.split("/").at(-2) + "/" + carData.image.split("/").at(-1).split(".")[0];

    let data = {};

    if (fields.name != undefined) {
      data.name = fields.name;
    }

    if (fields.rentPerDay != undefined) {
      data.rentPerDay = fields.rentPerDay;
    }

    if (fields.capacity != undefined) {
      data.capacity = fields.capacity;
    }

    if (files.image != undefined) {
      await cloudinaryConfig.uploader.upload(files.image.path, { folder: "cars" }, async (err, result) => {
        if (!!err) {
          res.end("Upload Gambar Gagal.");
          return;
        }

        data.image = result.secure_url;

        await cloudinaryConfig.uploader.destroy(filename);
      });
    }

    await carService.updateCarById(req.currentUser, data, params.id);

    return res.status(200).json({
      message: "Berhasil Mengubah Mobil!",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.delete = async (req, res) => {
  try {
    let params = req.params;

    let carData = await carService.oneCarById(params.id);

    if (carData == null) {
      throw "Mobil Tidak Ditemukan.";
    }

    let filename = carData.image.split("/").at(-2) + "/" + carData.image.split("/").at(-1).split(".")[0];

    await cloudinaryConfig.uploader.destroy(filename);

    await carService.deleteCar(req.currentUser, params.id);

    return res.status(200).json({ message: "Berhasil Hapus Mobil." });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = controller;
