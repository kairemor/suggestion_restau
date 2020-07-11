const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  first_name: {
    type:String,
    required: true
  },
  last_name: {
    type:String,
    required: true
  },
  classroom: {
    type:String,
    required: true
  },
  phone_number: { 
    type: Number, 
    unique: true, 
    required: true},
  shoulder : {
    type: Number,
    required: true
  },
  shaft : {
    type: Number,
    required: true
  },
  chest : {
    type: Number,
    required: true
  },
  buttock : {
    type: Number,
    required: true
  },
  pantaloons : {
    type: Number,
    required: true
  },
  choice: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('blouson', schema)