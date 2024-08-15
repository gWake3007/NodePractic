import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export async function registerUser(user) {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email already in User');
  }
}

//?Викликаємо throw замість return тому що таким чином код попадає в catch і далі через ctrlWrapper код іде по next замість закінчення.
