import createHttpError from 'http-errors';

import { getProduct, getProducts } from '../services/products.js';

export async function getProductsController(req, res) {
  const products = await getProducts();

  res.status(200).send({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
}

export async function getProductController(req, res, next) {
  const { id } = req.params;

  const product = await getProduct(id);

  if (product === null) {
    return next(createHttpError.NotFound('Product not found!'));
  }
  res.status(200).send({
    status: 200,
    message: `Successfully found product with id ${id}!`,
    data: product,
  });
}
