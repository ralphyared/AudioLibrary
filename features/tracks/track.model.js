import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    name: String,
    singer: String,
    category: Schema.Types.ObjectId,
    album: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("Track", trackSchema);
