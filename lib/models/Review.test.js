const Review = require('./Review');

describe('Review Model', () => {
  it('has a required title', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

});
