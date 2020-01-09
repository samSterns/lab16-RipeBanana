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

schema.statics.findByIdAndDeleteIfNoReviews = function(id) {
  return this
    .model('Review')
    .find({ reviewer: id })
    .then(review => {
      if(review.length === 0) {
        return this.findByIdAndDelete(id);
      }
      throw Error('This reviewer currently has reviews and cannot be deleted');
    });
};

schema.virtual('review', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'recipeId'
});

module.exports = mongoose.model('Reviewer', schema);

