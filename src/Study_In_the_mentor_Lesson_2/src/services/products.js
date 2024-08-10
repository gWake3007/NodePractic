import { Product } from '../db/models/product.js';

export async function getProducts() {
  return await Product.find();
}

//?findOne - схожий на метод findById але він повертає об'єкт параметрів.
export async function getProduct(id) {
  return await Product.findOne({ _id: id });
}
