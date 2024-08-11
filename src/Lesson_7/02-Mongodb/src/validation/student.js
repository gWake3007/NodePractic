import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  gender: Joi.string().valid('male', 'female').required(),
  email: Joi.string().email().required(),
  year: Joi.number().required(),
  duty: Joi.boolean(),
});
