import path from 'node:path';
import * as fs from 'node:fs/promises';

const DB_PATH = path.resolve('db.json');

fs.readFile(DB_PATH, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  .then((movies) => {
    const newMovies = [
      ...movies,
      {
        userId: 5,
        id: 5,
        title: 'delectus gg aut autem',
        completed: false,
      },
    ];
    fs.writeFile(DB_PATH, JSON.stringify(newMovies));
  })
  .then(() => console.log('Done'))
  .catch((error) => console.error(error));
