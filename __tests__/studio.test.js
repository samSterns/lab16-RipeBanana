require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');

describe('studio routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let studio;
  let actor;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'MGM',
      address: { city: 'Hollywood', state: 'California', country: 'United States' }
    });
    actor = await Actor.create({
      name: 'Tom Hanks',
      dob: 19560609,
      pob: 'California'
    });
    await Film.create({
      title: 'Toy Story',
      studioId: studio._id,
      released: 1995, 
      cast: [{ role: 'Woody', actor: actor._id }]
    });
    
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
          films: [{ _id:expect.any(String), title: 'Toy Story' }],
          __v: 0
        });
      });
  });

  it('updates a studio by id', async() => {
    return request(app)
      .patch(`/api/v1/studios/${studio._id}`)
      .send({ name: 'Twisted Productions' })
      .then(res => {
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

