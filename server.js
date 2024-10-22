// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the database connection function
require('dotenv').config(); // To use .env variables

const app = express();

// Connect Database
connectDB(); // Connecting to MongoDB

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/players', require('./routes/playerRoutes')); // Use the player routes

app.use('/api/teams', require('./routes/teamRoutes')); // Use the team routes


// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



