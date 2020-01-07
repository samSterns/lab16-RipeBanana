const Actor = require('./Actor');

describe('Actor Model', () => {
  it('has a required name', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  
});
