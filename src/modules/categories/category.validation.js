import Joi from "joi";

const addCategorySchema = {
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

export { addCategorySchema };
