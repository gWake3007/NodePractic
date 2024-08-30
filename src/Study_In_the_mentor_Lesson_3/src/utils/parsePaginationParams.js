const parseNumber = (number, defaultNumber) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultNumber;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  //?Тут ми використовуємо попередню функцію parseNumber в якій два аргументи. Перший це номер(якщо він є) та номер по замовчуванню якщо перший аргумент 'string' або 'undefined'!
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
