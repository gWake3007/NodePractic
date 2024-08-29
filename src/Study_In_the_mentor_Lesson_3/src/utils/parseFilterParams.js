const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;
  const isCategory = (category) =>
    ['books', 'electronics', 'clothing', 'other'].includes(category);

  if (isCategory(category)) return category;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return;

  return parsedNumber;
};

export function parseFilterParams(query) {
  //   console.log(query);
  const { category, minPrice, maxPrice } = query;
}
