require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let reviewer;

  beforeEach(async() => {
    reviewer = await Reviewer.create({
      name: 'Randy',
      company: 'Ripe Bananas'
    });
    // create film.create 
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
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
    const reviewers = await Reviewer.create([
      { name: 'Randy', company: 'Ripe Bananas' },
      { name: 'Ramon', company: 'Ripe Bananas' },
      { name: 'Roger', company: 'Ripe Bananas' },
    ]);
      
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
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0,
        });
      });
  });

  it('updates a reviewer by id', async() => {
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
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

  it('deletes a reviewer by id', async() => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0
        });
        return Reviewer.find();
      })
      .then(reviewer =>{
        expect(reviewer).toHaveLength(0);
      });
  });
}); 

