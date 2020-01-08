const { getStudio, getStudios } = require('../lib/helpers/data-helpers'); 

const request = require('supertest');
const app = require('../lib/app');


describe('studio routes', () => {
  
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
    const studios = await getStudios(); 
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
    const studio = await getStudio(); 
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio, films: expect.any(Array)
        });
      });
  });

  it('deletes a studio by id', async() => {
    const studio = await getStudio(); 
    return request(app)
      .delete(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });
}); 

