import mongoose from "mongoose";

import databaseURL from "./config/config.js";
import { addCategory } from "./features/categories/category.service.js";

const connectDB = async () => {
  await mongoose.connect(databaseURL);
};

try {
  connectDB();
} catch (err) {
  throw err;
}

const testCase = () => {
  addCategory("Jazz", "Jazz it up with this classic category.");
};

testCase();
