const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  Tel: {
    type: String,
  },
  Birthday: {
    type: Date,
  },
  Message: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
