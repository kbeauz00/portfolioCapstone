const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Login = mongoose.model("Login", loginSchema);

module.exports = {
  model: Login,
  schema: loginSchema,
};
