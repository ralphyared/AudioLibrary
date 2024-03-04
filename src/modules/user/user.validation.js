import Joi from "joi";

const signupSchema = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    dateOfBirth: Joi.date(),
    location: {
      latitude: Joi.number(),
      longitude: Joi.number(),
    },
  }),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

export { signupSchema, loginSchema };
