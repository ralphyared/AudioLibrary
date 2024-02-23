import mongoose from "mongoose";

import Category from "./category.model.js";

const addCategory = (name, description) => {
  const category = new Category({
    name: name,
    description: description,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  category.save();
};

export { addCategory };
