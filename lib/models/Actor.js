const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  pob: {
    type: String
  }
});

module.exports = mongoose.model('Actor', schema);
