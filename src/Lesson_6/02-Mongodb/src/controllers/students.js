import createHttpError from 'http-errors';

import {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../services/students.js';

export async function getStudentsController(req, res) {
  const students = await getStudents();

  res.send({ status: 200, data: students });
}

export async function getStudentController(req, res, next) {
  //?За допомогою деструкторизація з request дістаємо динамічний параметр id.
  const { id } = req.params;

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

export async function createStudentController(req, res) {
  const student = {
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    year: req.body.year,
  };

  const createdStudent = await createStudent(student);

  res
    .status(201)
    .send({ status: 201, message: 'Created Student!', data: createdStudent });
}

//? res.status(204).end(); - end() для того щоб показати що запит вже закінченно(тобто дані видаленні успішно) і нічого вже не повертається.

export async function deleteStudentController(req, res, next) {
  const { id } = req.params;

  const studentDelete = await deleteStudent(id);
  if (studentDelete === null) {
    return next(createHttpError.NotFound('Student not found!'));
  }
  console.log({ studentDelete });
  res.status(204).end();
}

export async function updateStudentController(req, res, next) {
  const { id } = req.params;

  const student = {
    name: req.body.name,
    gender: req.body.gender,
    year: req.body.year,
    email: req.body.email,
  };

  const update = await updateStudent(id, student);
  if (update === null) {
    return next(createHttpError.NotFound('Student not found!'));
  }
  console.log({ update });
  res
    .status(200)
    .send({ status: 200, message: `Update student ${id}`, data: update });
}
