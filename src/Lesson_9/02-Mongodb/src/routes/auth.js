import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

export default router;
