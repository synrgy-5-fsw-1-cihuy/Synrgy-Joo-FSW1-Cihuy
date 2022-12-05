"use strict";

const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");
const userService = require("../services/users.services");
const controller = {};

controller.registerMember = async (req, res) => {
  try {
    let fields = req.fields;

    let checkUser = await userService.oneUserEmail(fields.email);

    if (checkUser != null) {
      throw "User Existed!";
    }

    let password = await bcrypt.hash(fields.password);

    let data = {
      email: fields.email,
      password: password,
      role: "member",
    };

    await userService.insertUser(data);

    return res.status(200).json({
      message: "User created!",
      data: {
        email: fields.email,
        role: "member",
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.registerAdmin = async (req, res) => {
  try {
    let fields = req.fields;

    let checkUser = await userService.oneUserEmail(fields.email);

    if (checkUser != null) {
      throw "Admin User Existed!";
    }

    let password = await bcrypt.hash(fields.password);

    let data = {
      email: fields.email,
      password: password,
      role: "admin",
    };

    await userService.insertUser(data);

    return res.status(200).json({
      message: "Admin User created!",
      data: {
        email: fields.email,
        role: "admin",
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.login = async (req, res) => {
  try {
    let fields = req.fields;

    let checkUser = await userService.oneUserEmail(fields.email);

    if (checkUser == null) {
      throw "User not found. Please register";
    }

    let checkPassword = await bcrypt.compare(fields.password, checkUser.password);

    if (!checkPassword) {
      throw "Password incorrect";
    }

    let data = {
      id: checkUser.id,
      email: checkUser.email,
      role: checkUser.role,
    };

    let token = jwt.sign(data);

    return res.status(200).json({
      message: "Login successfully",
      data: {
        token: token,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

controller.activeUser = async (req, res) => {
  try {
    return res.status(200).json({
      data: req.currentUser,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.export = controller;
