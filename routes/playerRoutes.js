const express = require('express');
const router = express.Router();
const Player = require('../models/Player'); // Import the Player model

// POST /players - Add a new player
router.post('/', async (req, res) => {
  const { name, position, team, points } = req.body;
  
  try {
    const player = new Player({
      name,
      position,
      team,
      points,
    });

    await player.save();
    res.status(201).json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /players - Retrieve all available players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find(); // Retrieve all players from the database
    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
