require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let studio;
  let actor; 
  let film;
  let review;
  let reviewer;

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
    
    film = await Film.create({
      title: 'Toy Story',
      studioId: studio._id,
      released: 1995, 
      cast: [{ role: 'Woody', actor: actor._id }]
    });
    
    reviewer = await Reviewer.create({
      name: 'Randy',
      company: 'Ripe Bananas'
    });

    review = await Review.create({
      rating: 4,
      reviewer: reviewer._id.toString(),
      review: 'it sucked',
      film: film._id
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Toy Story',
        studioId: studio._id.toString(),
        released: 1995, 
        cast: [{ role: 'Woody', actor: actor._id  }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: expect.any(String),
          studioId: studio._id.toString,
          released: expect.any(String), 
          cast: [{ 
            _id: expect.any(String), 
            role: expect.any(String),
            actor: actor._id.toString() 
          }],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await Film.create([
      { title: 'Toy Story',
        studioId: studio._id,
        released: 1995, 
        cast: [{ role: 'Woody' }, { actor: mongoose.Schema.Types.ObjectId }]
      }, {
        title: 'Toy Story 2',
        studioId: studio._id,
        released: 1997, 
        cast: [{ role: 'Woody' }, { actor: mongoose.Schema.Types.ObjectId }]
      }, {
        title: 'Toy Story 3',
        studioId: studio._id,
        released: 1999, 
        cast: [{ role: 'Woody' }, { actor: mongoose.Schema.Types.ObjectId }] 
      }
    ]);
      
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          expect(res.body).toContainEqual({
            _id: film._id.toString(),
            name: film.name
          });
        });
      });

  });

  it('get film by Id', async() => {
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          title: expect.any(String),
          studioId: studio._id.toString(),
          released: 1995, 
          cast: [{ 
            _id: expect.any(String), 
            role: expect.any(String),
            actor: actor._id.toString() 
          }],
          __v: 0,
        });
      });
  });


  it('deletes a film by id', async() => {
    return request(app)
      .delete(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          title: 'Toy Story',
          studioId: studio._id,
          released: 1995, 
          cast: [{ 
            _id: expect.any(String), 
            role: expect.any(String),
            actor: actor._id.toString() 
          }],
          __v: 0,
        });
        return Film.find();
      })
      .then(film =>{
        expect(film).toHaveLength(0);
      });
  });
}); 

