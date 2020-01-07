const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/studios', require('./routes/studio'));
app.use('/api/v1/actors', require('./routes/actor'));
app.use('/api/v1/reviewers', require('./routes/reviewer'));
// add other schemas

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
