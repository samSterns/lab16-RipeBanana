const Film = require('./Film');

describe('Film Model', () => {
  it('has a required title', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });

});
