import Category from "./category.model.js";
import { commonErrorMessages } from "../../global/error.messages.js";

const addCategory = async (name, description, userId) => {
  const category = new Category({
    name: name,
    description: description,
    createdBy: userId,
  });
  await category.save();
  return category._id;
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    const err = new Error(commonErrorMessages.notFound("category").message);
    err.statusCode = commonErrorMessages.notFound("category").status;
    throw err;
  }
  return category;
};

export { addCategory, getCategoryById };
