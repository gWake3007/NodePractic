import express from 'express';

import studentRoutes from './routes/students.js';

const app = express();

//?Тут ми всі роути students підключаємо як middleware.Додаємо аргумент '/students' щоб у файлі де прописані роути його прибрати.
app.use('/students', studentRoutes);

//?Робимо middleware для запитів на неіснуючий Роут.next - ми не використовуємо тому що нам нікуди далі іти але він має бути!
app.use((req, res, next) => {
  res.status(404).send({ status: 404, message: 'Not found!' });
});

export default app;
