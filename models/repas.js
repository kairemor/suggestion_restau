const mongoose = require('mongoose');

const schemaRepas = new mongoose.Schema({
  day_number: {
    type: Number,
    required: true,
    unique: true,
  },
  day: {
    type: String,
    required: true,
    unique: true,
  },
  repas: {
    type: String,
    required: true,
  },
  diner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('repas', schemaRepas);