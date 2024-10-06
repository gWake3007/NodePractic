import { isHttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
  }
  console.log(error);

  res.status(500).send({ message: 'Internal Server Error!' });
}

//?isHttpError - метод з бібліотека http-errors який перевіряє тип помилки!
