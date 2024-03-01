import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import databaseURL from "./src/config/config.js";
import { addCategory } from "./src/features/categories/category.service.js";
import {
  addAlbum,
  deleteAlbum,
  setTrackDateToAlbum,
} from "./src/features/albums/album.service.js";
import {
  addTrack,
  deleteTracks,
  findTrackIdsbyAlbumId,
  findLastTrackAddedToAlbum,
} from "./src/features/tracks/track.service.js";

import categoryRoutes from "./src/features/categories/category.route.js";

const app = express();

const connectDB = async () => {
  await mongoose.connect(databaseURL);
};

app.use(bodyParser.json());

app.use("/category", categoryRoutes);

try {
  connectDB();
} catch (err) {
  throw err;
}

app.listen(3000);

const testCase = async () => {
  const categoryPopId = await addCategory(
    "Pop",
    "Pop it up with this funky category."
  );
  const categoryJazzId = await addCategory(
    "Jazz",
    "Jazz it up with this classic category."
  );

  const firstAlbumId = await addAlbum("My Album", "My personal album.", true);

  await addTrack("Love you baby", "Yuji", categoryPopId, firstAlbumId);
  await addTrack("Love you booby", "Yujo", categoryPopId, firstAlbumId);
  await addTrack("Love you beeby", "Yuje", categoryPopId, firstAlbumId);

  await setTrackDateToAlbum(firstAlbumId);

  const tempAlbumId = await addAlbum("Temp Album", "My temporary album.", true);

  await addTrack("Love me baby", "Yujib", categoryJazzId, tempAlbumId);
  await addTrack("Love me booby", "Yujob", categoryJazzId, tempAlbumId);
  await addTrack("Love me beeby", "Yujeb", categoryJazzId, tempAlbumId);

  await setTrackDateToAlbum(tempAlbumId);

  const tracksByAlbumId = await findTrackIdsbyAlbumId(tempAlbumId);

  await deleteTracks(tracksByAlbumId);

  await deleteAlbum(tempAlbumId);

  const lastTrack = await findLastTrackAddedToAlbum(firstAlbumId);
  await deleteTracks([lastTrack]);
};

// testCase();
