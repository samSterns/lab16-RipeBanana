const { getReview, getReviews } = require('../lib/helpers/data-helpers');
const { getFilm, getFilms } = require('../lib/helpers/data-helpers');
const { getReviewer, getReviewers } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('review routes', () => {
  it('creates a review', async() => {
    const film = await getFilm(); 
    const reviewer = await getReviewer(); 
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        reviewer: reviewer._id,
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
    const reviews = await getReviews(); 
      
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
    const reviewer = await getReviewer(); 
    const review = await getReview(); 
  
    return request(app)
      .get(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });

  it('deletes a review by id', async() => {
    const review = await getReview(); 
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
      
  });
}); 

