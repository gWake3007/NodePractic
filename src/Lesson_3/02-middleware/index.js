import express from 'express';

const app = express();

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

app.get('/', (req, res) => {
  res.send('middleware message');
});

app.listen(8080, () => {
  console.log('Server started 8080 middleware!');
});

//?middleware - це проміжна функція перед нашим запитом.
