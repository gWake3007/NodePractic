import express from 'express';
import {
  getStudentsController,
  getStudentController,
  createStudentController,
  deleteStudentController,
  updateStudentController,
  changeStudentDutyController,
} from '../controllers/students.js';

import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { studentSchema, studentDutySchema } from '../validation/student.js';

const router = express.Router();
//?jsonParser - вважається таким чином краще передавати express.json(). Замість того щоб це робити через app.
const jsonParser = express.json();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:id', isValidId, ctrlWrapper(getStudentController));

//?upload.single('photo') - single метод для завантаження одного файлу(зображення).Назва файлу довільна.
router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  validateBody(studentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/:id', ctrlWrapper(deleteStudentController));

router.put(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(studentSchema),
  ctrlWrapper(updateStudentController),
);

router.patch(
  '/:id/duty',
  isValidId,
  jsonParser,
  validateBody(studentDutySchema),
  ctrlWrapper(changeStudentDutyController),
);

export default router;
