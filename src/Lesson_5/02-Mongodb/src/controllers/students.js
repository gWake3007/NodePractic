import { getStudents, getStudent } from '../services/students.js';

export async function getStudentsController(req, res, next) {
  try {
    const students = await getStudents();

    res.send({ status: 200, data: students });
  } catch (error) {
    next(error);
  }
}

export async function getStudentController(req, res, next) {
  try {
    //?За допомогою деструкторизація з request дістаємо динамічний параметр id.
    const { id } = req.params;
    //?findById() - Повертає або об'єкт який він знайшов або null.
    const student = await getStudent(id);
    if (student === null) {
      return res
        .status(404)
        .send({ status: 404, message: 'Student not found!' });
    }
    res.send({ status: 200, data: student });
  } catch (error) {
    next(error);
  }
}

//?next(error) - замість того щоб в цьому файлі обробляти помилку 500 в catch передаємо туди next(error) та обробляємо її в app.js
