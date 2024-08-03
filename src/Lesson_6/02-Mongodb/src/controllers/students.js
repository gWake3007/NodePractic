import createHttpError from 'http-errors';

import { getStudents, getStudent } from '../services/students.js';

export async function getStudentsController(req, res) {
  const students = await getStudents();

  res.send({ status: 200, data: students });
}

export async function getStudentController(req, res, next) {
  //?За допомогою деструкторизація з request дістаємо динамічний параметр id.
  const { id } = req.params;
  //?findById() - Повертає або об'єкт який він знайшов або null.
  const student = await getStudent(id);
  if (student === null) {
    // return next(createHttpError(404, 'Student not found!'));
    // return next(createHttpError[404]('Student not found!'));
    return next(createHttpError.NotFound('Student not found!'));
    //?Всі типи повернення помилки з бібліотеки http-erros.
  }
  res.send({ status: 200, data: student });
}

//?next(error) - замість того щоб в цьому файлі обробляти помилку 500 в catch передаємо туди next(error) та обробляємо її в app.js
