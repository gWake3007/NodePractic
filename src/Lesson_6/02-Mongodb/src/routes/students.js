import express from 'express';
import {
  getStudentsController,
  getStudentController,
  createStudentController,
  deleteStudentController,
  updateStudentController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
//?jsonParser - вважається таким чином краще передавати express.json(). Замість того щоб це робити через app.
const jsonParser = express.json();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:id', ctrlWrapper(getStudentController));

router.post('/', jsonParser, ctrlWrapper(createStudentController));

router.delete('/:id', ctrlWrapper(deleteStudentController));

router.put('/:id', jsonParser, ctrlWrapper(updateStudentController));

export default router;
