import * as service from "./category.service.js";

const addCategory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const name = req.body.name;
    const description = req.body.description;
    await service.addCategory(name, description, userId);
    res.end();
  } catch (err) {
    next(err);
  }
};

export { addCategory };
