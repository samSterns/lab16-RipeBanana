require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');

describe('review routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let review;

  beforeEach(async() => {
    review = await Review.create({
      title: 'Toy Story',
      studioId: mongoose.Schema.Types.ObjectId,
      released: 1995, 
      cast: [{ role: 'Woody' }, { actor: mongoose.Schema.Types.ObjectId }]
    });
    // create review.create 
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        reviewerId: reviewer._id,
        review: 'It made me cry',
        filmId: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          reviewerId: reviewer._id,
          review: 'It made me cry',
          filmId: film._id,
          __v: 0
        });
      });
  });

  it('gets all reviews', async() => {
    const reviews = await Review.create([
      { name: 'Randy', company: 'Ripe Bananas' },
      { name: 'Ramon', company: 'Ripe Bananas' },
      { name: 'Roger', company: 'Ripe Bananas' },
    ]);
      
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviews.forEach(film => {
          expect(res.body).toContainEqual({
            _id: film._id.toString(),
            name: film.name
          });
        });
      });

  });

  it('get review by Id', async() => {
    return request(app)
      .get(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0,
        });
      });
  });

  it('updates a review by id', async() => {
    return request(app)
      .patch(`/api/v1/reviews/${review._id}`)
      .send({ name: 'Rachel' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Rachel',
          company: 'Ripe Bananas',
          __v: 0
        });
      });
  });

  it('deletes a review by id', async() => {
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0
        });
        return Review.find();
      })
      .then(film =>{
        expect(film).toHaveLength(0);
      });
  });
}); 

