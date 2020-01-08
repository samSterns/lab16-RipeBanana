const chance = require('chance').Chance();
const Studio = require('../models/Studio');
const Actor = require('../models/Actor');
const Review = require('../models/Review');
const Film = require('../models/Film');
const Reviewer = require('../models/Reviewer');

module.exports = async({ actor = 40, studio = 4, reviewer = 10, film = 20, review = 20 } = {}) => {
  const createdActor = await Actor.create([...Array(actor)].map(() => {
    return { 
      name: chance.name(),
      dob: chance.date(),
      pob: chance.state() 
    }; 
  }));

  const createdStudio = await Studio.create([...Array(studio)].map(() => {
    return { 
      name: Studio.name,
      address: { city: chance.city, state: chance.state() }
    };
  }));

    
  const createdFilm = await Film.create([...Array(film)].map(() => {
    return { 
      title: chance.word(),
      studioId: chance.pickone(createdStudio.map(studioId => studioId._id)),
      released: chance.year(),
      cast: [{ role: chance.character(), actor: chance.pickone(createdActor.map(actor => actor._id)) }]
    };
  }));
    
  const createdReviewer = await Reviewer.create([...Array(reviewer)].map(() => {
    return { 
      name: chance.name(),
      company: chance.company(),
    };
  })); 
    
  await Review.create([...Array(review)].map(() => {
    return {
      rating: chance.integer({ min: 0, max: 5 }),
      reviewer: chance.pickone(createdReviewer.map(reviewer => reviewer._id)),
      review : chance.sentence(),
      film: chance.pickone(createdFilm.map(film => film._id))
    };
  }));

};
