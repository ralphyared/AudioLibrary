import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    location: String,
  },
  { timestamps: { createdAt: "registrationDate" } }
);

export default mongoose.model("User", userSchema);
