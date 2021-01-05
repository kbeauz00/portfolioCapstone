const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .select("+password")
    .exec((error, user) => {
      if (error) return response.status(500);

      console.log("user", user);
      if (user) {
        user.comparePassword(request.body.password, (error, isMatch) => {
          if (error)
            return response
              .status(500)
              .json({ message: "Authentication Error", error });

          if (isMatch) {
            jwt.sign(
              { user },
              process.env.JWT_SECRET,
              { expiresIn: "2h" },
              (error, token) => {
                if (error) return response.sendStatus(401);
                response.json({ token });
              }
            );
          } else {
            response.sendStatus(401);
          }
        });
      } else {
        response.sendStatus(401);
      }
    });
});

router.post("/logout", (request, response) => {
  User.findOne({ username: request.body.username }, (error, user) => {
    if (error) throw error;
    // Do whatever needs to happen at logout
  });
});

module.exports = router;
