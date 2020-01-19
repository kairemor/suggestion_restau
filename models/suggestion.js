const mongoose = require('mongoose');

const SuggesSchema = new mongoose.Schema({
  classroom: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: false
  },
  readBy: {
    type: String,
    default: ''
  },
  appreciationRepas: [{
    type: String,
    required: true
  }],
}, {
  timestamps: true
});


const Sugges = mongoose.model('suggestion', SuggesSchema);

module.exports = Sugges;