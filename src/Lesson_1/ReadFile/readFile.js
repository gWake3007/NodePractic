//?Звичайний спосіб читання txt файлу. Використовуємо commontJs.
// const fs = require('node:fs');

// fs.readFile('read.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log({ data });
// });

//?Спосіб за допомогою промісу.
const fs = require('node:fs/promises');

fs.readFile('read.txt', { encoding: 'utf-8' })
  .then((data) => console.log({ data }))
  .catch((error) => console.error(error));
