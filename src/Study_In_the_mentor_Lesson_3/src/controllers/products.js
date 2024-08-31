import createHttpError from 'http-errors';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.js';

export async function getProductsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);

  const filter = parseFilterParams(req.query);
  //?Додаємо filter з parseFilterParams у сервіс.
  const products = await getProducts({ page, perPage, filter });

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

export async function createProductController(req, res) {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
  };

  const createdProduct = await createProduct(product);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a product!',
    data: createdProduct,
  });
}

export async function updateProductController(req, res, next) {
  const { id } = req.params;
  const changed = req.body;

  const changedProduct = await updateProduct(id, changed);

  if (changedProduct === null) {
    return next(createHttpError.NotFound('Product not found!'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a product!',
    data: changedProduct,
  });
}

export async function deleteProductController(req, res, next) {
  const { id } = req.params;

  const deletedProduct = await deleteProduct(id);
  if (deletedProduct === null) {
    return next(createHttpError.NotFound('Product not found!'));
  }

  res.status(200).send({
    status: 200,
    message: `Product with id ${id} is deleted!`,
    data: deletedProduct,
  });
}
