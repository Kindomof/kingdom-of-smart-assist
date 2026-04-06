const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0, // Auto Leaderboard zai fara lissafi daga nan
  },
  wins: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
