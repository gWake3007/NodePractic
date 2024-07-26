import express from 'express';

const app = express();

//?Приклади запитів.
app.get('/', (request, response) => {
  //   response.send('I am Serui');
  response.json({ message: 'server response111' });
});

//?8080 - це порт на який ми будемо посилати запити(бажано до 1500 не використовувати тому що їх використовує windows!!!)
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
