import { Product } from '../db/models/product.js';

export async function getProducts() {
  return await Product.find();
}

export async function getProduct(id) {
  return await Product.findById(id);
}
