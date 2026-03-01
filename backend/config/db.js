const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This looks for the MONGO_URI in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Error: ${error.message}`);
    process.exit(1); // Closes the server if the DB fails
  }
};

module.exports = connectDB;