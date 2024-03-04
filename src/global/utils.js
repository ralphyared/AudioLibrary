export const validate = (schemas) => (req, res, next) => {
  const errorMessages = [];

  for (const type of Object.keys(schemas)) {
    const schema = schemas[type];
    const { error } = schema.validate(req[type]);
    if (error) errorMessages.push(error.details[0].message);
  }

  const error = {
    statusCode: 400,
    messages: errorMessages,
  };

  errorMessages.length ? next(error) : next();
};
