import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export async function registerUser(user) {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email already in User');
  }
  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
}

//?(user.password, 10)де 10 це saltRounds. Для швидкості хешування. Залежить від того який в нас сервер.
//?Викликаємо throw замість return тому що таким чином код попадає в catch і далі через ctrlWrapper код іде по next замість закінчення.

export async function loginUser(email, password) {
  const maybeUser = await User.findOne({ email });

  if (maybeUser !== null) {
    throw createHttpError(404, 'User not found!');
  }

  const isMatch = await bcrypt.compare(password, maybeUser.password);

  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: maybeUser._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: maybeUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(),
    refreshTokenValidUntil: new Date(),
  });
}

//?bcrypt.compare(password, maybeUser.password); - паттерн з бібліотеки bcrypt для порівняння захешованого паролю з тим що ввів користувач!
//?З бібліотеки crypto беремо метод  crypto.randomBytes(30).toString('base64'); для токенів.
