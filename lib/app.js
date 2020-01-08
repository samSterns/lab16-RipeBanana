const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/studios', require('./routes/studio'));
app.use('/api/v1/actors', require('./routes/actor'));
app.use('/api/v1/reviewers', require('./routes/reviewer'));
app.use('/api/v1/films', require('./routes/film'));
app.use('/api/v1/reviews', require('./routes/review'));
app.use('api/v1/seed', require('../lib/helpers/seed'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
