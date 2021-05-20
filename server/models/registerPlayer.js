const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Demonstrate linking vs embedding
const registerPlayerSchema = new mongoose.Schema({
  players: [{ type: Schema.Types.ObjectId, ref: "player" }],
  coach: { type: Schema.Types.ObjectId, ref: "Coach" },
});

const RegisterPlayer = mongoose.model("RegisterPlayer", registerPlayerSchema);

module.exports = {
  model: RegisterPlayer,
  schema: registerPlayerSchema,
};
