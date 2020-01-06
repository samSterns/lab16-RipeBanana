require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const Studio = require('../models/Studio');

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
          id: expect.any(String),
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
      const studios = await Studios.create([
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
                    _id: studio._id.toString
                })
            })
        })

    });
}; 
