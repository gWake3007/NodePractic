const fs = require('node:fs/promises');

fs.appendFile('append.txt', 'contentAppend \n')
  .then(() => console.log('Done'))
  .catch((error) => console.error(error));
