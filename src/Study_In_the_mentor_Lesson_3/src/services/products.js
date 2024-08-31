import { Product } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

//?В функції getProducts(filter = {}) вказано якщо фільтра в аргументі немає то буде пустий об'єкт.ВАЖЛИВО!!!

export async function getProducts({ page, perPage, filter = {} }) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productQuery = Product.find();
  const productCount = await Product.find()
    .merge(productQuery)
    .countDocuments();

  if (filter.category) {
    productQuery.where('category').equals(filter.category);
  }

  if (filter.minPrice) {
    productQuery.where('price').gte(filter.minPrice);
  }

  if (filter.maxPrice) {
    productQuery.where('price').lte(filter.maxPrice);
  }

  const products = await productQuery.skip(skip).limit(limit).exec();
  const paginationData = calculatePaginationData(productCount, perPage, page);

  return {
    data: products,
    ...paginationData,
  };
  //?Тут для фільтрації ми змінюємо сам return щоб працювала наша фільтрація!
  // return await Product.find();
}

//?findOne - схожий на метод findById але він повертає об'єкт параметрів.
export async function getProduct(id) {
  return await Product.findOne({ _id: id });
}

export async function createProduct(payload) {
  return await Product.create(payload);
}

export async function updateProduct(id, changed) {
  return await Product.findByIdAndUpdate(id, changed, {
    new: true,
    runValidators: true,
  });
}

export async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}
