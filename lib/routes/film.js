const { Router } = require('express');
const Film = require('../models/Film');


module.exports = Router()
  .post('/', (req, res) => {
    Film
      .create(req.body)
      .then(film => res.send(film));
  })

  .get('/', (req, res) => {
    Film
      .find()
      .select({ name: true })
      .then(films => res.send(films));
  })
  .get('/:id', (req, res) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film));
    // will need the promise.all when add more schemas 
  })

  .patch('/:id', (req, res) => {
    Film
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(film => res.send(film));
  })

  .delete('/:id', (req, res) => {
    Film
      .findByIdAndDelete(req.params.id)
      .then((film) => res.send(film));
  });
