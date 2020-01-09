require('dotenv').config();

const { getReviewer, getReviewers, getReview } = require('../lib/helpers/data-helpers');
const Review = require('../lib/models/Review');

const request = require('supertest');
const app = require('../lib/app.js');

describe('reviewer routes', () => {  
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Randy',
        company: 'Ripe Bananas'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers(); 
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual({
            _id: reviewer._id.toString(),
            name: reviewer.name
          });
        });
      });

  });

  it('get reviewer by Id', async() => {
    const reviewer = await getReviewer(); 
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer(); 
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: reviewer.name })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: reviewer.name,
          company: reviewer.company,
          __v: 0
        });
      });
  });

  it('deletes a reviewer because they have No reviews', async() => {
    const reviewWithNoReviews = await getReviewer();
    await Review.deleteMany({ reviewer: reviewWithNoReviews._id });

    return request(app)
      .delete(`/api/v1/reviewers/${reviewWithNoReviews._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewWithNoReviews);
      });
  });

  it('does Not delete a reviewer because they have written a review', async() => {
    const review = await getReview(); 
    const reviewerWithReview = await getReviewer({ _id: review.reviewer });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewerWithReview._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          message: 'This reviewer currently has reviews and cannot be deleted', 
          status: 500
        });
      });
  }); 

});

