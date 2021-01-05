const express = require("express");
const router = express.Router();
const User = require("../models/user");
const checkUser = require("../middleware/checkUser");
const add = require("date-fns/add");

// router.all("*", checkUser);

router.post("/", checkUser, (request, response) => {
  const newRecord = new User(request.body);

  newRecord.save((error, user) => {
    if (error) return response.status(500).json(error.message);
    user.password = undefined;
    user.confirmationHash = undefined;
    return response.json(user);
  });
});

router.get("/", checkUser, (request, response) => {
  User.find({}, (error, data) => {
    if (error) return response.status(500).json(error.message);
    return response.json(data);
  });
});

router.get("/:id", checkUser, (request, response) => {
  User.findById(request.params.id, (error, data) => {
    if (error) return response.status(500).json(error.message);
    return response.json(data);
  });
});

router.put("/:id", checkUser, (request, response) => {
  const body = request.body;

  if (body.password) {
    // Convert password to a hash and store in passwordHash, don't store in plain text
  }

  User.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        email: body.email,
        userName: body.userName,
        active: body.active,
        approved: body.approved,
        password: body.password,
      },
    },
    (error, data) => {
      if (error) return response.status(500).json(error.message);
      return response.json(data);
    }
  );
});

router.delete("/:id", checkUser, (request, response) => {
  User.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.status(500).json(error.message);
    return response.json(data);
  });
});

router.post("/register", (request, response) => {
  const newRecord = new User(request.body);

  newRecord.save((error, data) => {
    if (error) return response.status(500).json(error.message);
    data.password = undefined;
    data.confirmation = undefined;

    // Trigger registration mail logic
    return response.json(data);
  });
});

router.post("/confirmation/:email", (request, response) => {
  console.log("request.params.email", request.params.email);
  const email = decodeURIComponent(request.params.email);
  console.log("email", email);

  if (!request.body.code)
    return response.status(400).json({ error: "Confirmation code required" });

  User.findOne({ email: email })
    .select("+confirmation")
    .exec((error, user) => {
      if (error) return response.status(500).json(error.message);

      if (user) {
        if (user.verified) return response.json(user);
        if (request.body.code !== user.confirmation.code)
          return response.status(400).json("Confirmation code mismatch");
        console.log("Date.now()", Date.now());
        console.log("user.confirmation.expiresAt", user.confirmation.expiresAt);
        if (Date.now() > user.confirmation.expiresAt)
          return response.status(400).json("Confirmation code has expired");

        user.verified = true;
        user.confirmation = null;
        user.save((error, user) => {
          if (error) return response.status(500).json(error.message);
          return response.json(user);
        });
      } else {
        return response.status(404).json("User not found");
      }
    });
});

module.exports = router;
