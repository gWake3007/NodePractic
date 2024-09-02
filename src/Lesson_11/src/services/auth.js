import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jvt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

import { JVT } from '../constants/index.js';

import {
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
  SMTP,
} from '../constants/index.js';

import { sendMail } from '../utils/sendMail.js';

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

  if (maybeUser === null) {
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
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

export function logoutUser(sessionId) {
  return Session.deleteOne({ _id: sessionId });
}

export async function refreshUserSession(sessionId, refreshToken) {
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (session === null) {
    throw createHttpError(401, 'Session not found!');
  }
  //?Тут умова якщо дата більша за дату коли закінчіться рефареш токен.
  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired!');
  }
  await Session.deleteOne({ _id: sessionId });

  const accessedToken = crypto.randomBytes(30).toString('base64');
  const refreshedToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: session.userId,
    accessToken: accessedToken,
    refreshToken: refreshedToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

//?bcrypt.compare(password, maybeUser.password); - паттерн з бібліотеки bcrypt для порівняння захешованого паролю з тим що ввів користувач!
//?З бібліотеки crypto беремо метод  crypto.randomBytes(30).toString('base64'); для токенів.
//?    accessTokenValidUntil: new Date(Date.now + ACCESS_TOKE_TTL),refreshTokenValidUntil: new Date(Date.now + REFRESH_TOKEN_TTL), - формули які визначають скільки часу будуть існувати наши токени!

export async function requestResetEmail(email) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError(404, 'User not found!');
  }

  //?expiresIn - опція яка вказує на час існування токену.
  const resetToken = jvt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    JVT.SECRET,
    { expiresIn: '15m' },
  );

  await sendMail({
    from: SMTP.FROM_EMAIL,
    to: email,
    subject: 'Reset your password',
    html: `<h1>Reset your password TITLE H1<p>Please open this<a href="http://www.google.com/reset-password?token=${resetToken}">link</a></p></h1>`,
  });
}
