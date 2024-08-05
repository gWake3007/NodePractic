import express from 'express';

import studentRoutes from './routes/students.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

//?Ця middleware потрібна для того щоб розпарсити на body.Тобто щоб можна було робити POST запити.(Але вважається поганим тоном та передається через роути)
// app.use(express.json());

//?Тут ми всі роути students підключаємо як middleware.Додаємо аргумент '/students' щоб у файлі де прописані роути його прибрати.
app.use('/students', studentRoutes);

//?Робимо middleware для запитів на неіснуючий Роут.next - ми не використовуємо тому що нам нікуди далі іти але він має бути!
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
