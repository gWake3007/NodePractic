// import { PATH_DB } from './Study_In_the_mentor/constants/products.js';
// console.log(PATH_DB);

//?Запускаємо сервер.
// import express from 'express';

// const PORT = 3000;

// const app = express();

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello Serui!',
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

//?Створення сторінки на сервері.
// import express from 'express';

// const PORT = 3000;

// const app = express();

// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//?Частина setver.js яка запускається в index.js.
// src/index.js

// import express from 'express';

// const PORT = 3000;

// const app = express();

// // Middleware для логування часу запиту
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// // наприклад, у запитах POST або PATCH
// app.use(express.json());

// // Маршрут для обробки GET-запитів на '/'
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello, World111!',
//   });
// });

// // Middleware для обробких помилок (приймає 4 аргументи)
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: 'Something went wrong',
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
