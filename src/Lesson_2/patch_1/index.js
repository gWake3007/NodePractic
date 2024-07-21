import { readMovies } from './movies/movies.js';

async function main() {
  const movies = await readMovies();
  console.log(movies);
}

main().catch((err) => console.error(err));
