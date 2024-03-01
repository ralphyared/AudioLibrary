import { addCategory } from "./category.service.js";

const addCategoryController = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  await addCategory(name, description);
  res.end();
};

export { addCategoryController };
