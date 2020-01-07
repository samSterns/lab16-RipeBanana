require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

describe('actor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let actor;

  beforeEach(async() => {
    actor = await Actor.create({
      name: 'Tom Hanks',
      dob: 19560609,
      pob: 'California'
    });
  });
  // create film.create 

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Tom Hanks',
        dob: 1956-6-9,
        pob: 'California'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Tom Hanks',
          dob: expect.any(String),
          pob: 'California',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await Actor.create([
      { name: 'Tom Hanks', dob: 19560609, pob: 'California' },
      { name: 'Dakota Fanning', dob: 19940223, pob: 'Georgia' },
      { name: 'Vivien Leigh', dob: 19131105, pob: 'India' },
    ]);
      
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id.toString(),
            name: actor.name
          });
        });
      });
  });
      
  it('get actor by Id', async() => {
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          name: expect.any(String),
          dob: expect.any(String),
          pob: expect.any(String),
          __v: 0
        });
      });
  });
        
  it('updates an actor by id', async() => {
    return request(app)
      .patch(`/api/v1/actors/${actor._id}`)
      .send({ name: 'Timothy Hanks' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          name: 'Timothy Hanks',
          dob: expect.any(String),
          pob: 'California',
          __v: 0
        });
      });
  });
        
  it('deletes a actor by id', async() => {
    return request(app)
      .delete(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          name: 'Tom Hanks',
          dob: expect.any(String),
          pob: 'California',
          __v: 0
        });
        return Actor.find();
      })
      .then(actor =>{
        expect(actor).toHaveLength(0);
      });
  });
}); 
    
