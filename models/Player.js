// models/Player.js
const mongoose = require('mongoose');

// Create the Player Schema
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Create and export the Player model
module.exports = mongoose.model('Player', PlayerSchema);
