import { Student } from '../models/student.js';

export function getStudents() {
  return Student.find();
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
