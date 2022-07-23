const mongoose = require('mongoose')

const Schema = mongoose.Schema

const matchSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  homeTeam: {
    type: String,
    required: true
  },
  homeTeamScore: Number,
  visitingTeam: {
    type: String,
    required: true
  },
  visitingTeamScore: Number,
  usersParticipating: [String],
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Match', matchSchema)