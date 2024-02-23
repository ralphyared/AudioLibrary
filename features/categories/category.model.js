import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.model("Category", categorySchema);
