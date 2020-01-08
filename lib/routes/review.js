const { Router } = require('express');
const Review = require('../models/Review');


module.exports = Router()
  .post('/', (req, res) => {
    Review
      .create(req.body)
      .then(review => {
        res.send(review);
      });
  })

  .get('/', (req, res) => {
    Review
      .find()
      .limit(100)
      .sort()
      .select({ name: true })
      .then(reviews => res.send(reviews));
  })
  .get('/:id', (req, res) => {
    Review
      .findById(req.params.id)
      .then((review) => res.send(review));
    // will need the promise.all when add more schemas 
  })

  .delete('/:id', (req, res) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then((review) => res.send(review));
  });
