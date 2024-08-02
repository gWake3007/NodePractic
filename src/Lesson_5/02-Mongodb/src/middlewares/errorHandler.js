// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(500).send({ message: 'Internal Server Error!' });
}
