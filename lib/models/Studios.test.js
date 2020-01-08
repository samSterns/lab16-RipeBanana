
const Studio = require('./Studio');

describe('Studio Model', () => {
  const studio = new Studio();
  const { errors } = studio.validateSync();
  it('has a required name', () => {
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  
});
