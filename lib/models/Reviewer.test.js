const Reviewer = require('./Reviewer');

describe('Reviewer Model', () => {
  it('has a required name', () => {
    const reviewer = new Reviewer();
    const { errors } = reviewer.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

});
