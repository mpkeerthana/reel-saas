const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  niche: {
    type: String,
    required: true,
    enum: ['Motivation', 'Love', 'Comedy', 'Lifestyle', 'Food', 'Fitness', 'Tech', 'Fashion', 'Travel', 'Education']
  },
  tone: {
    type: String,
    required: true,
    enum: ['Inspirational', 'Savage', 'Sad', 'Funny', 'Mysterious', 'Empowering']
  },
  hashtags: [String],
  estimatedEngagement: {
    type: Number,
    min: 0,
    max: 100
  },
  hook: {
    type: String,
    trim: true
  },
  angle: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Idea', ideaSchema);