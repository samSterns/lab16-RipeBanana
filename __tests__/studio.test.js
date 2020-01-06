require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let studio;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'MGM',
      address: {
        city: 'Hollywood',
        state: 'California',
        country: 'United States'
      }
    });
    // create film.create 
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'MGM',
        address: {
          city: 'Hollywood',
          state: 'California',
          country: 'United States'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'MGM',
          address: {
            city: 'Hollywood',
            state: 'California',
            country: 'United States'
          },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await Studio.create([
      {
        name: 'MGM',
        address: { city: 'Hollywood', state: 'California', country: 'United States' }
      },
      {
        name: 'Laika',
        address: { city: 'Portland', state: 'Oregon', country: 'United States' }
      },
      {
        name: 'Pixar',
        address: { city: 'Emeryville', state: 'California', country: 'United States' }
      }
    ]);
      
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id.toString(),
            name: studio.name
          });
        });
      });

  });

  it('get studio by Id', async() => {
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          name: 'MGM',
          address: {
            city: 'Hollywood',
            state: 'California',
            country: 'United States'
          },
          __v: 0
        });
      });
  });

  it('updates a studio by id', async() => {
    return request(app)
      .patch(`/api/v1/studios/${studio._id}`)
      .send({ name: 'Twisted Productions' })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Twisted Productions',
          address: {
            city: 'Hollywood',
            state: 'California',
            country: 'United States'
          },
          __v: 0
        });
      });
  });

  it('deletes a studio by id', async() => {
    return request(app)
      .delete(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'MGM',
          address: {
            city: 'Hollywood',
            state: 'California',
            country: 'United States'
          },
          __v: 0
        });
        return Studio.find();
      })
      .then(studio =>{
        expect(studio).toHaveLength(0);
      });
  });
}); 

