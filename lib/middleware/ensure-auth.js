const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = () => jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH_CLIENT_ID,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ['RS256']
});
