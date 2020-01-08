require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('review routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let review;
  let reviewer;
  let film;
  let studio;
  let actor;

  beforeEach(async() => {
    reviewer = await Reviewer.create({
      name: 'Randy',
      company: 'Ripe Bananas'
    });
    studio = await Studio.create({
      name: 'MGM',
      address: { city: 'Hollywood', state: 'California', country: 'United States' }
    });
    actor = await Actor.create({
      name: 'Tom Hanks',
      dob: 19560609,
      pob: 'California'
    });

    film = await Film.create({
      title: 'Toy Story',
      studioId: studio._id,
      released: 1995, 
      cast: [{ role: 'Woody', actor: actor._id }]
    });
    review = await Review.create({
      rating: 4,
      reviewer: reviewer._id,
      review: 'it sucked',
      film: film._id
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        reviewer: reviewer._id.toString(),
        review: 'It made me cry',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          reviewer: reviewer._id.toString(),
          review: 'It made me cry',
          film: film._id.toString(),
          __v: 0
        });
      });
  });

  it('gets all reviews', async() => {
    const reviews = await Review.create([
      { rating: 4,
        reviewer: reviewer._id.toString(),
        review: 'It made me cry',
        film: film._id.toString()
      },
      { rating: 2,
        reviewer: reviewer._id.toString(),
        review: 'It made me walk out',
        film: film._id.toString()
      },
      { rating: 5,
        reviewer: reviewer._id.toString(),
        review: 'It is my favorite',
        film: film._id.toString()
      }
    ]);
      
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviews.forEach(film => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            film: film.name
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
          rating: 4,
          reviewer: reviewer._id.toString(),
          review: 'it sucked',
          film: film._id.toString(),
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
          rating: 4,
          reviewer: reviewer._id.toString(),
          review: 'it sucked',
          film: film._id.toString(),
          __v: 0
        });
        return Review.find();
      })
      .then(film =>{
        expect(film).toHaveLength(0);
      });
  });
}); 

