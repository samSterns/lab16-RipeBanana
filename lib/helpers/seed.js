const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');

module.exports = async({ actor: 40, studio: 4, Reviewer: 10, Film: 20, Review: 20 } = {}) => {
    const createdActor = await Actor.create([...Array(actor)].map(() => {
        name: chance.name();
        dob: chance.date();
        pob: chance.locales()
    }));

    const createdStudio = await Studio.create([...Array(studio)].map((_, i) => {
        name: `Studio ${i}`;
        address: { city: chance.city; state: chance.state() }
    }));

    
    const createdFilm = await Film.create([...Array(review)].map((_, i) = {
        title: chance.title(),
        studioId: chance.pickone(createdStudio.map(studioId => studioId._id)),
        released: chance.year(),
        cast: [{ role: chance.character(), actor: chance.pickone(createdActor.map(actor => actor._id)) }]
    }));
    
    const createReviewer = Reviewer.create([...Array(review)].map((_, i) = {
        name: chance.name(),
        company: chance.company(),
    })); 
    
    await Review.create([...Array(review)].map((_, i) = {
        rating: chance.number(n < 4),
        reviewer: chance.pickone(createdReviewer.map(reviewer => reviewer._id)),
        review : chance.sentence(),
        film: chance.pickone(createdFilm.map(film => film._id))
    }));

};
