const { Router } = require('express');
const Studio = require('../models/Studio');


module.exports = Router()
  .post('/', (req, res) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio));
  })

  .get('/', (req, res) => {
    Studio
      .find()
      .select({ name: true })
      .then(studios => res.send(studios));
  })
  .get('/:id', (req, res) => {
    Studio
      .findById(req.params.id)
      .populate('films', { _id: true, title: true, studioId: false })
      .then((studio) => res.send(studio));
    // will need the promise.all when add more schemas 
  })

  .patch('/:id', (req, res) => {
    Studio
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(studio => res.send(studio));
  })

  .delete('/:id', (req, res) => {
    Studio
      .findByIdAndDelete(req.params.id)
      .then((studio) => res.send(studio));
      // cannot be deleted if attached to film 
  });
