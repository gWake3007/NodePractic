import { Product } from '../db/models/product.js';

export function getProducts() {
  return Product.find();
}

export function getProduct(productId) {
  return Product.findById(productId);
}
