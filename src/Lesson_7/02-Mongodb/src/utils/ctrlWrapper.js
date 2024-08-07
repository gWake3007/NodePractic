function ctrlWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export { ctrlWrapper };

//?ctrlWrapper - додаткова обготка обробника подій.Тобто обробник try catch та next().
