const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false }
  }
},  
{ id: false, toJSON: { virtuals: true } });

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studioId'
});

module.exports = mongoose.model('Studio', schema);
