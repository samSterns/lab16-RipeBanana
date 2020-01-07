const { Router } = require('express');
const Actor = require('../models/Actor');


module.exports = Router()
  .post('/', (req, res) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor));
  })

  .get('/', (req, res) => {
    Actor
      .find()
      .select({ name: true })
      .then(actors => res.send(actors));
  })
  .get('/:id', (req, res) => {
    Actor
      .findById(req.params.id)
      .then(actor => res.send(actor));
    // will need the promise.all when add more schemas 
  })

  .patch('/:id', (req, res) => {
    Actor
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(actor => res.send(actor));
  })

  .delete('/:id', (req, res) => {
    Actor
      .findByIdAndDelete(req.params.id)
      .then((actor) => res.send(actor));
  });
