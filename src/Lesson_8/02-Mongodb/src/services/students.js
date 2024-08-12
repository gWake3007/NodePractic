import { Student } from '../models/student.js';

export async function getStudents({ page, perPage }) {
  //?Формула запитів на кожній сторінці.
  const skip = page > 0 ? (page - 1) * perPage : 0;

  //?Щоб спростити иа пришвидшити код використовуємо метод Promise.all(для того щоб не писати декілька промісів а все вмістити в один).
  const [student, count] = await Promise.all([
    Student.find().skip(skip).limit(perPage),
    Student.countDocuments(),
  ]);

  //?Метод skip() - потрібен для того щоб пропустити потрібну нам кількість елементів.Тобто по формулі вище skip.limit(perPage) - метод для загальної кількості елементів що потрібно пропустити на сторінку.
  // const student = await Student.find().skip(skip).limit(perPage);

  //?countDocuments() - команда для підрахування загальної кількості документів.
  // const count = await Student.countDocuments();

  //?Формула для підрахування загальної кількості сторінок.
  const totalPages = Math.ceil(count / perPage);

  return {
    student,
    page,
    perPage,
    totalItem: count,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1, //?Формула яка повертає true або false.Так само як і вижча.Тобто наступня сторінка є або її немає.
  };
}

//?findById() - Повертає або об'єкт який він знайшов або null.
export function getStudent(studentId) {
  return Student.findById(studentId);
}

export function createStudent(payload) {
  return Student.create(payload);
}

//?findByIdAndDelete - метод для того щоб знайти за id потрібний об'єкт данних та видалити.
export function deleteStudent(studentId) {
  return Student.findByIdAndDelete(studentId);
}

//?findByIdAndUpdate - метод потрібен для змінни данних(PUT).
//?{ new: true } - цей третій параметр потрібен для того щоб коли ми захочемо повернути результат нашого оновлення то відображався не попередній результат а вже оновленний!
//?upsert: true - за допомогою цієї опції можна створити новий ресурс методом put.
//?includeResultMetadata: true - опція яка відображає чи за допомогою методу put був створенний ресурс чи змінений (повертає інформацію про результат).
export function updateStudent(studentId, payload) {
  return Student.findByIdAndUpdate(studentId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
}

//?{ onDuty: duty } - за допомогою деструкторизації мі дістаємось до поля onDuty щоб змінити його.
export function changeStudentDuty(studentId, duty) {
  return Student.findByIdAndUpdate(studentId, { onDuty: duty }, { new: true });
}
