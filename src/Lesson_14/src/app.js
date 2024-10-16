import path from 'node:path';

import cors from 'cors';

import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import { auth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

//?cors() - тут потрібен для порту localhost:3000 або 127.0.0.1:3000 щоб уникнути помилок(це два аналогічні порти але браузер їх бачить по різному)
app.use(cors());

//?swaggerDocs - Використовується коли ми робимо запит на api-docs.
app.use('/api-docs', swaggerDocs());

//?Тут ми даємо можливість переглядати зображення через Postman.(Спеціально перемо його поверх всіх роутів)
app.use('/avatars', express.static(path.resolve('src', 'public/avatars')));

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
