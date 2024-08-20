import { Student } from '../models/student.js';

export async function getStudents({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  parentId,
}) {
  //?Формула запитів на кожній сторінці.
  const skip = page > 0 ? (page - 1) * perPage : 0;

  //?studentQuery - додається нижче до якого додаються всі фільтра.
  const studentQuery = Student.find();

  //?Метод .where() потрібен для фільтрації(точніше для визначення того що ми фільтруємо) .gte() якщо більше або рівне .lte() - меньше або рівне. ДЛЯ СЕБЕ!!!(gt() - більше, lt() - меньше).
  if (typeof filter.minYear !== 'undefined') {
    studentQuery.where('year').gte(filter.minYear);
  }

  if (typeof filter.maxYear !== 'undefined') {
    studentQuery.where('year').lte(filter.maxYear);
  }

  student.where('parentId').equals(parentId);

  //?Щоб спростити иа пришвидшити код використовуємо метод Promise.all(для того щоб не писати декілька промісів а все вмістити в один).
  //?.sort({ [sortBy]: sortOrder }) - метод для сортування з деструкторизацією.
  const [count, student] = await Promise.all([
    //?Student.find().merge(studentQuery).countDocuments() - другий спосіб написання.
    Student.countDocuments(studentQuery),
    studentQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
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
