const { getActor, getActors } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  
  it('creates a actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Tom Hanks',
        dob: 1956060./9,
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
    const actors = await getActors();
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
    const actor = await getActor();
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
        
  it('deletes a actor by id', async() => {
    const actor = await getActor();
    return request(app)
      .delete(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
}); 
