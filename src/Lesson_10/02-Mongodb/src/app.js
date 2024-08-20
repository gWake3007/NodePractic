import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import { auth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

//?cookieParser - підключається глобально перед роутом authRoures!!
app.use(cookieParser());

//?Роути до аунтефікації(реєстрації).
app.use('/auth', authRoutes);
//?Тут ми всі роути students підключаємо як middleware.Додаємо аргумент '/students' щоб у файлі де прописані роути його прибрати.
//?auth middleware для перевірки чи авторизований користувач.Щоб не можна було роутами користуватись не авторизованим!
app.use('/students', auth, studentRoutes);

//?Робимо middleware для запитів на неіснуючий Роут.next - ми не використовуємо тому що нам нікуди далі іти але він має бути!
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
