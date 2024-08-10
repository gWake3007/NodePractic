import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));

router.get('/products/:id', ctrlWrapper(getProductController));

router.post('/products', ctrlWrapper(createProductController));

router.patch('/products/:id', ctrlWrapper(updateProductController));

export default router;
