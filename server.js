require('dotenv').config();
const app = require('./lib/app');
const dbConnect = require('./lib/utils/dbConnect');

dbConnect();

const PORT = process.env.PORT || 7891;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}.`);
});
