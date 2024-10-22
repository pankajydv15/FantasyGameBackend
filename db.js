// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // To access environment variables from .env

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from the .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Export the function to use it in server.js
