import path from 'mode:path';

import multer from 'multer';

//?destination: function (req, file, cb) - функція яка приймає req - реквест, file - файл, cb - коллбек.
//?cb(null, шлях) - В коллбеках першим аргументом завжди передають пимилку(null) навіть якщо її немає. А другим шлях до даних.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src', 'tmp'));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, 'file.txt');
  },
});

const upload = multer({ storage: storage });

export { upload };
