import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    name: String,
    singer: String,
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    albumId: { type: Schema.Types.ObjectId, ref: "Album" },
  },
  { timestamps: true }
);

export default mongoose.model("Track", trackSchema);
