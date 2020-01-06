const Studio = require('./Studio');

describe('Studio Model', () => {
  it('has a required name', () => {
    const studio = new Studio();
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  //   it('has a required address', () => {
  //     const studio = new Studio();
  //     const { errors } = studio.validateSync();

//     expect(errors.address.message).toEqual('Path `address` is required.');
//   });
});
