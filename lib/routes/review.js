const { Router } = require('express');
const Review = require('../models/Review');


module.exports = Router()
  .post('/', (req, res) => {
    console.log(req.body);
    Review
      .create(req.body)
      .then(review => {
        console.log(review.toJSON());
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

// .patch('/:id', (req, res) => {
//   Review
//     .findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(review => res.send(review));
// })

  .delete('/:id', (req, res) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then((review) => res.send(review));
  });
