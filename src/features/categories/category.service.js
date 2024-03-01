import Category from "./category.model.js";

const addCategory = async (name, description) => {
  const category = new Category({
    name: name,
    description: description,
  });
  await category.save();
  return category._id;
};

export { addCategory };
