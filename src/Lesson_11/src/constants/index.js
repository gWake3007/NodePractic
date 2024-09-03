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
