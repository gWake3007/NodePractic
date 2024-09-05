import path from 'node:path';

import multer from 'multer';

//?destination: function (req, file, cb) - функція яка приймає req - реквест, file - файл, cb - коллбек.
//?cb(null, шлях) - В коллбеках першим аргументом завжди передають пимилку(null) навіть якщо її немає. А другим шлях до даних.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src', 'tmp'));
  },
  filename: function (req, file, cb) {
    //?Виводимо в консоль інформацію про наше зображення.
    // console.log(file);
    //?uniqueSuffix - Змінна яка нажає кожному файлу(зображенню) УНІКАЛЬНЕ значення.Але цей приклад не корректний!Розширення можуть бути інші!
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    //?Цей спосіб більш корректний. Тому що рандомне значення з датою ставиться з початку.А формат файлу той же що і приходить.
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

export { upload };
