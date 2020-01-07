require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  let film;

  beforeEach(async() => {
    film = await Film.create({
      title: 'Toy Story',
      studioId: mongoose.Schema.Types.ObjectId,
      released: 1995, 
      cast: [{ role: 'Woody' }, { actor: mongoose.Schema.Types.ObjectId }]
    });
    // create film.create 
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Toy Story',
        studioId: studio._id,
        released: 1995, 
        cast: [{ role: 'Woody' }, { actor: mongoose.Schema.Types.ObjectId }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: expect.any(String),
          studioId: studio._id.toString,
          released: expect.any(String), 
          cast: [{ role: expect.any(String) }, { actor: mongoose.Schema.Types.ObjectId }],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await Film.create([
      { name: 'Randy', company: 'Ripe Bananas' },
      { name: 'Ramon', company: 'Ripe Bananas' },
      { name: 'Roger', company: 'Ripe Bananas' },
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
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0,
        });
      });
  });

  it('updates a film by id', async() => {
    return request(app)
      .patch(`/api/v1/films/${film._id}`)
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

  it('deletes a film by id', async() => {
    return request(app)
      .delete(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Randy',
          company: 'Ripe Bananas',
          __v: 0
        });
        return Film.find();
      })
      .then(film =>{
        expect(film).toHaveLength(0);
      });
  });
}); 

