require('dotenv').config();
require('./lib/utils/dbConnect')();

const PORT = process.env.PORT || 7891;

require('./lib/app').listen(PORT, () => {
  console.log(`Server started on ${PORT}.`);
});
