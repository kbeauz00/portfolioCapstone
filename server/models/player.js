const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new mongoose.Schema({
  uid: Number,
  Name: String,
  Email: String,
  Club: String,
  Tournament: String,
  Position: [String],
  GradYear: Number,
  // order: { type: Schema.Types.ObjectId, ref: "Order" },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = {
  model: Player,
  schema: playerSchema,
};
