import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from '../validation/product.js';
import { isValid } from '../middlewares/isValid.js';
import {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));

router.get('/products/:id', isValid, ctrlWrapper(getProductController));

router.post(
  '/products',
  validateBody(createProductValidationSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/products/:id',
  isValid,
  validateBody(updateProductValidationSchema),
  ctrlWrapper(updateProductController),
);

router.delete('/products/:id', isValid, ctrlWrapper(deleteProductController));

export default router;
