const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score1: {
    type: Number,
    default: 0,
  },
  score2: {
    type: Number,
    default: 0,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.index({ player1: 1, player2: 1 });
module.exports = mongoose.model('Match', MatchSchema);
