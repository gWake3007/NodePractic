import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

//?isValidObjectId - метод з mongoose щоб валідувати сам об'єкт id.

export function isValidId(req, res, next) {
  const { id } = req.params;

  if (isValidObjectId(id) !== true) {
    return next(createHttpError.NotFound('ID is not valid!'));
  }
  next();
}
