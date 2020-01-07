// const mongoose = require('mongoose');
const Studio = require('./Studio');

describe('Studio Model', () => {
  const studio = new Studio();
  const { errors } = studio.validateSync();
  it('has a required name', () => {
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  expect(res.body).toEqual({
    _id: expect.any(String),
    // expect(studio.toJSON()).toEqual({
    //   _id: expect.any(mongoose.Types.ObjectId),
    name: 'MGM',
    address: {
      city: 'Hollywood',
      state: 'California',
      country: 'United States'
    }


    //   it('has a required address', () => {

    //     expect(errors.address.message).toEqual('Path `address` is required.');
  });
});
