const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  uid: Number,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  model: User,
  schema: userSchema,
};
