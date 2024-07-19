const fs = require('node:fs/promises');

fs.writeFile('write.txt', 'I like Node.js')
  .then((respons) => console.log({ respons }))
  .catch((error) => console.error(error));
