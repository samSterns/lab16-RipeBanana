require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Actor = require('../models/Actor');
const Studio = require('../lib/models/Studio');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});
  
beforeEach(() => {
  return seed({ name: 'Tom Hanks', dob: 122595, pod: 'california' }),

  return seed({ name: 'MGM', address: { city: 'Hollywood', state: 'California', country: 'United States'}
  });

  return seed ({ name: 'Randy', company: 'Ripe Bananas' });

  return seed ({ title: 'Toy Story',
  studioId: studio._id,
  released: 1995, 
  cast: [{ role: 'Woody', actor: actor._id  }]
  });

  return seed({ rating: 4, reviewer: reviewer._id, review: 'it sucked', film: film._id
  });

});
  
afterAll(() => {
  return mongoose.connection.close();
});
const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: () => Model.findOne().then(prepare),
    [`get${modelName}s`]: () => Model.find().then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Actor),
  ...createGetters(Studio),
  ...createGetters(Review),
  ...createGetters(Reviewer),
  ...createGetters(Film),
};
