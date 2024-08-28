import createHttpError from 'http-errors';

//?Приклад синхронного методу написання validateBody. Різниця в тому що цей спосіб не використовує async await та в тому що в result після schema тут використовується команда validate. А в прикладі нижче validateAsync та використовується async await.ВАЖЛИВО!!!

// export function validateBody(schema) {
//   return (req, res, next) => {
//     const result = schema.validate(req.body, { abortEarly: false });

//     if (typeof result.error !== 'undefined') {
//       return next(
//         createHttpError(
//           400,
//           result.error.details.map((err) => err.message).join(', '),
//         ),
//       );
//     }
//     next();
//   };
// }

//?Другий приклад функції validateBody.ВАЖЛИВО ЦЯ ФУНКЦІЯ ЗАВЖДИ ПОВИННА БУТИ АСИНХРОННОЮ.

// export const validateBody = (schema) => (req, res, next) => {
//     try {
//       schema.validate(req.body, { abortEarly: false });
//       next();
//     } catch (err) {
//       const error = createHttpError(400, 'Bad Request', { errors: err.details });
//       next(error);
//     }
//   };

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', { errors: err.details });
    next(error);
  }
};
