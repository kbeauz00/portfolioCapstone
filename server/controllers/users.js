const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
//register post handle

router.post("/", (request, response) => {
  User.model.countDocuments({}, (err, count) => {
    request.body.uid = count;
    const data = { ...request.body };
    const newUser = new User.model(data);
    newUser.save((err, user) => {
      return err ? response.sendStatus(500).json(err) : response.json(user);
    });
  });
});
//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/users/login");
});
module.exports = router;
