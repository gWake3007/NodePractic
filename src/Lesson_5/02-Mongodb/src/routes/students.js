import express from 'express';
import {
  getStudentsController,
  getStudentController,
} from '../controllers/students.js';

const router = express.Router();

router.get('/', getStudentsController);

router.get('/:id', getStudentController);

export default router;
