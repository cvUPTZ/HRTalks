
// models/episode.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
}, {
  timestamps: true,
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;

