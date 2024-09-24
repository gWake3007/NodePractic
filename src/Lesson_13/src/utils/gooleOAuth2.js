import * as fs from 'node:fs';
import path from 'node:path';

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
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
  client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
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
