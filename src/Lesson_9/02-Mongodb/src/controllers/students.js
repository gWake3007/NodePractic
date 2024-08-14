import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  changeStudentDuty,
} from '../services/students.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getStudentsController(req, res) {
  //?Через деструкторизацію дістаємо властивості з функції parsePaginationParams.
  const { page, perPage } = parsePaginationParams(req.query);

  //?З імпортованої функції parseSortParams() - дістаємо параметри.
  const { sortBy, sortOrder } = parseSortParams(req.query);

  //?parseFilterParams() - з імпортованої функції з utils також дістаємо параметри.
  const filter = parseFilterParams(req.query);

  //?Та передаємо ці параметри в сервіс students!
  const students = await getStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

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

  //?result.value - краще одразу з цим value працювати щоб joi сам виправляв такі помилки як Number обгорнений в лапки тощо.
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

// eslint-disable-next-line no-unused-vars
export async function updateStudentController(req, res, next) {
  const { id } = req.params;

  const student = {
    name: req.body.name,
    gender: req.body.gender,
    year: req.body.year,
    email: req.body.email,
  };

  const update = await updateStudent(id, student);
  if (update.lastErrorObject.updatedExisting === true) {
    return res.status(200).send({
      status: 200,
      message: `Update student ${id}`,
      data: update.value,
    });
  }
  res
    .status(201)
    .send({ status: 201, message: 'Student created', data: update.value });
}

export async function changeStudentDutyController(req, res, next) {
  const { id } = req.params;
  const { duty } = req.body;

  const changeOnDuty = await changeStudentDuty(id, duty);

  if (changeOnDuty === null) {
    return next(createHttpError.NotFound('Student not found!'));
  }
  res.status(200).send({
    status: 200,
    message: 'Student onDuty changed!',
    data: changeOnDuty,
  });
}
