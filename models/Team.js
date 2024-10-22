// models/Team.js
const mongoose = require('mongoose');

// Create the Team Schema
const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player', // Reference to Player model
    },
  ],
  totalPoints: {
    type: Number,
    default: 0,
  },
});

// Create and export the Team model
module.exports = mongoose.model('Team', TeamSchema);
