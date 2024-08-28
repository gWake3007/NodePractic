import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from '../validation/product.js';
import {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));

router.get('/products/:id', ctrlWrapper(getProductController));

router.post(
  '/products',
  validateBody(createProductValidationSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/products/:id',
  validateBody(updateProductValidationSchema),
  ctrlWrapper(updateProductController),
);

router.delete('/products/:id', ctrlWrapper(deleteProductController));

export default router;
