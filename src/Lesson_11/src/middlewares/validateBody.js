import createHttpError from 'http-errors';

export function validateBody(schema) {
  return (req, res, next) => {
    //? abortEarly: false } - це опція яка за замовчуванням завжди true(abortEarly-припини раніше) тобто валідація закінчує перевірку на першій же помилці.Для того щоб в консолі побачити всі помилки валідації її треба поставити на false!!!
    const result = schema.validate(req.body, { abortEarly: false });
    //?Важливий момент з error в консолі. ЗВЕРТАЙ УВАГУ!!!
    // console.log({ result });

    if (typeof result.error !== 'undefined') {
      //?Перегляд помилки
      //   console.log(result.error);
      return next(
        createHttpError(
          400,
          result.error.details.map((err) => err.message).join(', '),
        ),
      );
    }
    next();
  };
}

//?Вгорі деструкторизація повернення помилки 400 через createHttpError.
//   return res.status(400).send({
//     status: 400,
//     message: 'Validation Error!',
//     data: result.error.details.map((err) => err.message).join(', '),
//   });
