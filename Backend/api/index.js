require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../src/app');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
  isConnected = true;
}

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};