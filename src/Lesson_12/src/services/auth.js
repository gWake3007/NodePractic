//?Використовуємо файлову систему для того щоб считати шаблон з handlebars який знаходиться у нас у файлі reset-password.hbs
import fs from 'node:fs';
import path from 'node:path';
import handlebars from 'handlebars';

import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

import { JWT } from '../constants/index.js';

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
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    JWT.SECRET,
    { expiresIn: '15m' },
  );

  //?templateSource - Тут считуємо файл reset-password.hbs
  const templateSource = fs.readFileSync(
    path.resolve('src/templates/reset-password.hbs'),
    {
      encoding: 'utf-8',
    },
  );

  //?Передаємо в handlebars наш шаблон.
  const template = handlebars.compile(templateSource);

  //?Передаємо змінні в наш html шаблон. Це ім'я користувача і сам токен.
  const html = template({ name: user.name, resetToken });

  try {
    await sendMail({
      from: SMTP.FROM_EMAIL,
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch {
    throw createHttpError(500, 'Cannot send email');
  }
}

export async function resetPassword(password, token) {
  try {
    //?decoded - Показує нам всю розшифровану інформацію з токену!(Тобто розкодований payload)
    const decoded = jwt.verify(token, JWT.SECRET);
    console.log(decoded);

    const user = await User.findOne({ _id: decoded.sub, email: decoded.email });

    if (user === null) {
      throw createHttpError(404, 'User not found!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
    );
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw createHttpError(401, 'Token error!');
    }
    //?Тут помилку викидуємо якщо в нас якась інша помилка і middleware її зловить.
    throw error;
  }
  //?Тут в консолі нам покузують наш НОВИЙ ПАРОЛЬ та наш токен за допомогою якого ми і міняємо пароль!
  // console.log({ password, token });
}
