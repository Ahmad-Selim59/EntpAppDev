const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  // set strict query to false

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
