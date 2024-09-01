function parseNumber(maybeNumber, defaultNumber) {
  if (typeof maybeNumber !== 'string') {
    return defaultNumber;
  }
  const parsedNumber = parseInt(maybeNumber);
  //?Number.isNaN(parsedNumber) - перевірка чи в query параметрі page=число.
  if (Number.isNaN(parsedNumber)) {
    return defaultNumber;
  }
  return parsedNumber;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  //   console.log({ parsedPage, parsedPerPage });
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
