import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductController,
} from '../controllers/products.js';

const router = Router();
// const jsonParser = json();

router.get('/products', ctrlWrapper(getProductsController));

router.get('/products/:id', ctrlWrapper(getProductController));

export default router;
