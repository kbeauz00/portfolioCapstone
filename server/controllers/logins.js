const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Login = require("../models/login");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/", (request, response) => {
  const newLogin = new Login.model(request.body);
  newLogin.save((err, login) => {
    return err ? response.sendStatus(500).json(err) : response.json(login);
  });
});

router.get("/:id", (request, response) => {
  Login.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

module.exports = router;
