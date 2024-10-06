import * as fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';
import createHttpError from 'http-errors';

import { GOOGLE_AUTH_CLIENT } from '../constants/index.js';
import { OAuth2Client } from 'google-auth-library';

//?CONFIG парсимо щоб звертатись до нього як до об'єкта а не як до string(Тобто щоб можна було з нього як з об'єкта діставати дані)
const CONFIG = JSON.parse(
  fs.readFileSync(path.resolve('src', 'google-oauth-credentials.json'), {
    encoding: 'utf-8',
  }),
);

//?Перевіряємо дані з CONFIG.
// console.log(CONFIG);
// console.log(CONFIG['web']['redirect_uris']);

const googleOAuth2Client = new OAuth2Client({
  clientId: String(GOOGLE_AUTH_CLIENT.ID),
  client_secret: String(GOOGLE_AUTH_CLIENT.SECRET),
  redirectUri: CONFIG['web']['redirect_uris'][0],
});

export function generateAuthUrl() {
  return googleOAuth2Client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}

//?validateCode - функція для валідації коду. Яка використовує метод getToken().
export async function validateCode(code) {
  try {
    const response = await googleOAuth2Client.getToken(code);
    console.log({ response });

    return googleOAuth2Client.verifyIdToken({
      idToken: response.tokens.id_token,
    });
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 499
    ) {
      throw createHttpError(401, 'Unauthorized');
    } else {
      throw error;
    }
  }
  //?Стандартна 401 помилка.Вище редагуємо код більш точніше.
  // if (typeof response.tokens.id_token === 'undefined') {
  //   throw createHttpError(401, 'Unauthorized');
  // }
}
