import { Product } from '../models/products.js';

export async function getProducts() {
  return await Product.find();
}

export async function getProduct(Id) {
  return await Product.findOne({ _id: Id });
}

export async function createProduct(payload) {
  return await Product.create(payload);
}

export async function deleteProduct(Id) {
  return await Product.findByIdAndDelete(Id);
}

export async function updateProduct(Id, payload) {
  return await Product.findByIdAndUpdate(Id, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
}

export async function changeProductPrice(Id, productPrice) {
  return await Product.findByIdAndUpdate(
    Id,
    { price: productPrice },
    { new: true },
  );
}
