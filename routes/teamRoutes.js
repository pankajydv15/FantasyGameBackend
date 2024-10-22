const express = require("express");
const router = express.Router();
const Team = require("../models/Team"); // Import the Team model
const Player = require("../models/Player"); // Import the Player model
const mongoose = require("mongoose");

// Create a new team
router.post("/", async (req, res) => {
  const { name, playerIds } = req.body;

  console.log("Received player IDs:", playerIds); // Debugging line

  try {
    // Validate if the team contains exactly 11 players
    if (playerIds.length !== 11) {
      return res
        .status(400)
        .json({ msg: "A team must have exactly 11 players." });
    }

    // Validate that all player IDs are ObjectIds
    const invalidIds = playerIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidIds.length > 0) {
      return res
        .status(400)
        .json({ msg: `Invalid player IDs: ${invalidIds.join(", ")}` });
    }

    // Fetch the player documents for the provided player IDs
    const players = await Player.find({ _id: { $in: playerIds } });
    if (players.length !== 11) {
      return res
        .status(400)
        .json({ msg: "One or more player IDs are invalid." });
    }

    // Calculate the total points of the team
    const totalPoints = players.reduce((acc, player) => acc + player.points, 0);

    // Create a new team
    const team = new Team({
      name,
      players: playerIds,
      totalPoints,
    });

    await team.save();
    res.status(201).json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find(); // Fetch all teams
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a team by name
router.get("/name/:name", async (req, res) => {
  try {
    const team = await Team.findOne({ name: req.params.name }).populate('players'); // Populate player details
    if (!team) {
      return res.status(404).json({ msg: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get('/:id', async (req, res) => {
  try {
    const teamId = req.params.id;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ msg: 'Invalid team ID format.' });
    }

    // Fetch the team from the database
    const team = await Team.findById(teamId).populate('players'); // Populating player details if needed

    if (!team) {
      return res.status(404).json({ msg: 'Team not found.' });
    }

    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
