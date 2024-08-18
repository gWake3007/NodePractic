export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

//?Змінна яка вказує скільки повинен працювати токен(вказуємо в мілісекундах тому що змінну передаємо в new Date).
export const ACCESS_TOKE_TTL = 15 * 60 * 1000; //?15 minutes in milliseconds.
export const REFRESH_TOKEN_TTL = 24 * 60 * 60 * 1000; //?One day in milliseconds.
