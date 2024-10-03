import 'dotenv/config';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

//?Змінна яка вказує скільки повинен працювати токен(вказуємо в мілісекундах тому що змінну передаємо в new Date).
export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; //?15 minutes in milliseconds.
export const REFRESH_TOKEN_TTL = 24 * 60 * 60 * 1000; //?One day in milliseconds.

export const SMTP = {
  SERVER: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};

export const JWT = {
  SECRET: process.env.JWT_SECRET,
};

export const CLOUDINARY = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ENABLE_CLOUDINARY: process.env.ENABLE_CLOUDINARY,
};

export const GOOGLE_AUTH_CLIENT = {
  ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
};
