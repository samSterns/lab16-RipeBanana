const { getFilm, getFilms } = require('../lib/helpers/data-helpers');
const { getStudio } = require('../lib/helpers/data-helpers'); 
const { getActor } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {
  
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Toy Story',
        studioId: studio._id,
        released: 1995, 
        cast: [{ role: 'Woody', actor: actor._id  }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: expect.any(String),
          studioId: studio._id,
          released: expect.any(Number), 
          cast: [{ 
            _id: expect.any(String), 
            role: expect.any(String),
            actor: actor._id
          }],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();
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
    const film = await getFilm();
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });


  it('deletes a film by id', async() => {
    const film = await getFilm();
    return request(app)
      .delete(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });
  
}); 

