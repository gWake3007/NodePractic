import cors from 'cors';
import express from 'express';

const app = express();

//?cors - підключаємо як глобальну middleware!
//?origin - Потрібен для того щоб вказати які оріджинали можут робити запит на наш сервер. Також можна зробити багато origin за допомогою whitelist[].(ЧИТАЙ ДОКУМЕНТАЦІЮ).
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, //?some legacy browsers (IE11, various SmartTVs) choke on 204(опція для старих браузерів)
  }),
);

app.get('/movies', (req, res) => {
  res.send([
    { title: 'Film One', year: 2020 },
    { title: 'Film Second', year: 2018 },
    { title: 'Film Third', year: 2022 },
  ]);
});

app.listen(8080, () => {
  console.log('Server started on port 8080!');
});
