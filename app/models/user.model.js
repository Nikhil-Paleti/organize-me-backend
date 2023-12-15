const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    address: String,
  })
);

module.exports = User;
