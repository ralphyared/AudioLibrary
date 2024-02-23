import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trackSchema = new Schema({
  name: String,
  singer: String,
});

export default mongoose.model("Track", trackSchema);
