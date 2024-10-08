import express from 'express';
import pinoHTTP from 'pino-http';

const app = express();
const pino = pinoHTTP({
  transport: {
    target: 'pino-pretty',
  },
});

app.use(pino);

app.use((req, res, next) => {
  console.log({ Method: req.method });
  console.log({ URL: req.url });
  next();
});

function middlewareA(req, res, next) {
  console.log('Middleware A');
  next();
}

function middlewareB(req, res, next) {
  console.log('Middleware B');
  next();
}

app.use(middlewareA);
app.use('/not-found', middlewareB);

//?Замість звичайних викликів middleware зробили їх функціями для можливого повторного виклику.Також при звичайних запитах middleware B не повертається тому що він повертається тільки при запитах "/not-found".Також якщо шлях "*" - це теж саме що і не вказуючі нічого.
// app.use((req, res, next) => {
//   console.log('Middleware A');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Middleware B');
//   next();
// });

//?Коли ми робимо res.send без next() то коли ми доходимо до цього middleware то далі запит в нас не йде.Тобто при звичайному запиті в нас буде месседж (middleware message) а при сторінці /not-found буде месседж (Route not found :()).Також middleware останній з помилкою 404 є глобальний і має бути останнім. Щоб не спрацьовувати коли помилки немає!!!
app.get('/', (req, res) => {
  console.log(undefined.unknwon());
  res.send('middleware message');
});

//?Page not found 404.
app.use((req, res, next) => {
  res.status(404).send({ status: 404, message: 'Route not found :(' });
});

//?Вивід помилки 500 для користувача щоб не було більш детальної інформації про сервер користувачеві а тільки цей message.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({ status: 500, message: 'Internal server Error!' });
});

app.listen(8080, () => {
  console.log('Server started 8080 middleware!');
});

//?middleware - це проміжна функція перед нашим запитом.
