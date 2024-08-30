//?parseCategory - функція для парсингу категорії.

const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;
  const isCategory = (category) =>
    ['books', 'electronics', 'clothing', 'other'].includes(category);

  if (isCategory(category)) return category;
};

//?parseNumber - функція для парсингу номеру(за яким буде відбуватись сортування по minPrice та maxPrice).

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return;

  return parsedNumber;
};

//?parseFilterParams - функція самого фільтру де використовуються дві функції вище!

export function parseFilterParams(query) {
  //   console.log(query);
  const { category, minPrice, maxPrice } = query;

  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parseNumber(minPrice);
  const parsedMaxPrice = parseNumber(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
}
