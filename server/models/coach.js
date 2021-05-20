const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  name: String,
  school: String,
  sport: String,
});

const Coach = mongoose.model("Coach", coachSchema);

module.exports = {
  model: Coach,
  schema: coachSchema,
};
