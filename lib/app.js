const express = require('express');
const app = express();
const dbConnectionState = require('./middleware/db-connection-state');
const ensureAuth = require('./middleware/ensure-auth');

app.use(require('cors')());

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use('/api/v1/meganap/databases', dbConnectionState, ensureAuth, require('./routes/databases'));
app.use('/api/v1/meganap/models', dbConnectionState, ensureAuth, require('./routes/models'));
app.use('/api', dbConnectionState, require('./routes/userRoutes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
