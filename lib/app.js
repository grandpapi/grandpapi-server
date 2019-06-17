const express = require('express'),
  app = express();
const dbConnectionState = require('./middleware/db-connection-state');

app.use(require('cors')());

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use('/api/v1/meganap/databases', dbConnectionState, require('./routes/databases'));
app.use('/api/v1/meganap/models', dbConnectionState, require('./routes/models'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
