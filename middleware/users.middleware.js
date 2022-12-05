"use strict";

const { expressjwt: jwt } = require("express-jwt");

const userService = require("../services/users.services");

require("dotenv").config();

const exportModule = {};

exportModule.checkUser = (role) => {
  return async (req, res, next) => {
    await jwt({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_ALGORITHM] })(req, res, async () => {
      if (req.auth === undefined) return res.status(401).json({ error: "Unauthorized access" });
      if (req.auth.id === undefined) return res.status(401).json({ error: "Unauthorized access" });
      if (req.auth.email === undefined) return res.status(401).json({ error: "Unauthorized access" });
      if (req.auth.role === undefined) return res.status(401).json({ error: "Unauthorized access" });

      let check = await userService.oneUserEmail(req.auth.email);

      if (check == null) {
        return res.status(401).json({ error: "Unauthorized access. Login lagi bro!" });
      }

      let currentUser = {
        id: check.id,
        email: check.email,
        role: check.role,
      };

      switch (role) {
        case "superadmin":
          if (currentUser != "superadmin") return res.status(401).json({ error: "Unauthorized access!" });
          break;

        case "admin":
          if (currentUser != "superadmin" || currentUser != "admin") return res.status(401).json({ error: "Unauthorized access!" });
          break;

        default:
          break;
      }

      req.currentUser = currentUser;

      next();
    });
  };
};

module.exports = exportModule;
