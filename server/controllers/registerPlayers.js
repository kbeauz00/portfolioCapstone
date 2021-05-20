const express = require("express");
const router = express.Router();
const RegisterPlayer = require("../models/registerPlayer");
const Coach = require("../models/coach");
const Player = require("../models/player");
const registerPlayer = require("../models/registerPlayer");

// Create a new order with customer, pizza, delivery and notes documents
router.post("/", (request, response) => {
  const body = request.body;

  // Create the subdocuments
  const coach = new Coach.model(body.coach);
  coach.save();

  const newRegisterPlayer = new RegisterPlayer.model({});

  const playerIds = body.player.map((player) => {
    const newPlayer = new Player.model({
      ...player,
      registerPlayer: newRegisterPlayer._id,
    });
    newPlayer.save();
    return newPlayer._id;
  });

  newRegisterPlayer.player = playerIds;
  newRegisterPlayer.coach = coach._id;

  newRegisterPlayer.save((error, data) => {
    return error ? response.sendStatus(500).json(error) : response.json(data);
  });
});

// Retrieve a single order with the option to not populate the subdocuments
router.get("/:id", (request, response) => {
  // Request parameters (params) are defined in the route, queryParams are provided after the url behind a ? and & in key=value pairs
  const params = request.params;
  const query = request.query;
  if (query.hasOwnProperty("raw") && query.raw === "true") {
    RegisterPlayer.model.findById(params.id, (error, data) => {
      return error ? response.sendStatus(500).json(error) : response.json(data);
    });
  } else {
    RegisterPlayer.model
      .findById(params.id)
      .populate("coach")
      .populate("players")
      .exec((error, data) => {
        return error
          ? response.sendStatus(500).json(error)
          : response.json(data);
      });
  }
});

// Retrieve all orders with the option to not populate the subdocuments
router.get("/", (request, response) => {
  const query = request.query;
  if (query.hasOwnProperty("raw") && query.raw === "true") {
    RegisterPlayer.model.find({}, (error, data) => {
      return error ? response.sendStatus(500).json(error) : response.json(data);
    });
  } else {
    RegisterPlayer.model
      .find({})
      .populate("coach")
      .populate("players")
      .exec((error, data) => {
        return error
          ? response.sendStatus(500).json(error)
          : response.json(data);
      });
  }
});

// Update a single player registration , delivery and notes subdocuments
router.put("/:id", (request, response) => {
  const data = request.body;
  RegisterPlayer.model.findByIdAndUpdate(
    request.params.id,
    // {
    //   // $set: {
    //   //   delivery: data.delivery,
    //   //   notes: data.notes,
    //   // },
    // },
    (error, data) => {
      data.players.forEach((player) => {
        Player.model.findByIdAndUpdate(
          player._id,
          {
            $setOnInsert: {
              Name: player.Name,
              Email: player.cheese,
              Club: player.Club,
              Tournament: player.Tournament,
              Position: player.Position,
              GradYear: player.GradYear,
            },
          },
          { upsert: true, new: true },
          (error) => {
            return response.sendStatus(500).json(error);
          }
        );
      });

      return error ? response.sendStatus(500).json(error) : res.json(data);
    }
  );
});

// Remove a single order and it's subdocuments
router.delete("/:id", (request, response) => {
  registerPlayer.model.findByIdAndDelete(
    request.params.id,
    {},
    (error, data) => {
      if (error) response.sendStatus(500).json(error);

      Player.model
        .deleteMany()
        .where("_id")
        .in(data.pizzas)
        .exec((error) => {
          if (error) return response.sendStatus(500).json(error);
        });

      Coach.model.findByIdAndRemove(data.coach, (error) => {
        if (error) return response.sendStatus(500).json(error);
      });

      return response.json(data);
    }
  );
});

module.exports = router;
