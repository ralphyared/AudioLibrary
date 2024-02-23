import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: String,
  description: String,
  showNbTracks: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastSongAddedAt: Date,
});

export default mongoose.model("Album", albumSchema);
