const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Player = require("../models/player");

router.post("/", (request, response) => {
  Player.model.countDocuments({}, (err, count) => {
    request.body.uid = count + 1;
    const data = { ...request.body };
    const newPlayer = new Player.model(data);
    newPlayer.save((err, player) => {
      return err ? response.sendStatus(500).json(err) : response.json(player);
    });
  });
});

router.get("/", (request, response) => {
  Player.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.get("/:id", (request, response) => {
  Player.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  Player.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        Name: body.Name,
        Email: body.Email,
        Club: body.Club,
        Tournament: body.Tournament,
        Position: body.Position,
        GradYear: body.GradYear,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

router.delete("/:id", (request, response) => {
  Player.model.findByIdAndRemove(request.params.id, {}, (err, data) => {
    console.log(data);
    if (err) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

module.exports = router;
