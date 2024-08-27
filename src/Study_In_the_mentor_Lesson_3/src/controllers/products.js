import createHttpError from 'http-errors';

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  changeProductPrice,
} from '../services/products.js';

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

export async function changeStudentDutyController(req, res, next) {
  const { id } = req.params;
  const { productPrice } = req.body;

  const changeOnPrice = await changeProductPrice(id, productPrice);

  if (changeOnPrice === null) {
    return next(createHttpError.NotFound('Student not found!'));
  }
  res.status(200).send({
    status: 200,
    message: 'Student onDuty changed!',
    data: changeOnPrice.value,
  });
}
