import { Product } from '../db/models/product.js';

export async function getProducts() {
  return await Product.find();
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
