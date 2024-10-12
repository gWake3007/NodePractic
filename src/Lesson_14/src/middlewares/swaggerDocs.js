import * as fs from 'node:fs';
import path from 'node:path';

import createHttpError from 'http-errors';

import swaggerUI from 'swagger-ui-express';

//?swaggerDocs - функція для роботи зі swaggerUI. Для використання бібліотеки щоб наша документація виглядала читабельнішою.
export function swaggerDocs() {
  try {
    const doc = JSON.parse(
      fs.readFileSync(path.resolve('docs', 'swagger.json'), {
        encoding: 'utf-8',
      }),
    );

    console.log(doc);

    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch (error) {
    console.error(error);

    return (req, res, next) => {
      next(createHttpError(500, 'Can load swagger docs'));
    };
  }
}
