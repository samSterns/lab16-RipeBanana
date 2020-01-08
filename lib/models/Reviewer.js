const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  id: false,
  toJSON: { virtuals: true }
});

schema.virtual('review', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'recipeId'
});

module.exports = mongoose.model('Reviewer', schema);

