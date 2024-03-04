import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    name: String,
    description: String,
    showNbTracks: Boolean,
    lastSongAddedAt: Date,
    createdBy: Schema.Types.ObjectId,
    updatedBy: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("Album", albumSchema);
