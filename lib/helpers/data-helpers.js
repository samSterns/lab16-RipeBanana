require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('../helpers/seed');
const Actor = require('../models/Actor');
const Studio = require('../models/Studio');
const Review = require('../models/Review');
const Film = require('../models/Film');
const Reviewer = require('../models/Reviewer');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});
  
beforeEach(() => {
  return seed({ actor: 40, studio: 4, Reviewer: 10, Film: 20, Review: 20 });
});

afterAll(() => {
  return mongoose.connection.close();
});
const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: () => Model.findOne().then(prepare),
    [`get${modelName}s`]: (query) => Model.find(query).then(docs => docs.map(prepare))
    
  };
};

module.exports = {
  ...createGetters(Actor),
  ...createGetters(Studio),
  ...createGetters(Review),
  ...createGetters(Reviewer),
  ...createGetters(Film),
};
