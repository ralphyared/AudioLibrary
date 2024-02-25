import mongoose from "mongoose";

import databaseURL from "./config/config.js";
import { addCategory } from "./features/categories/category.service.js";
import {
  addAlbum,
  deleteAlbum,
  setTrackDateToAlbum,
} from "./features/albums/album.service.js";
import {
  addTrack,
  deleteTracks,
  findTrackIdsbyAlbumId,
  findLastTrackAddedToAlbum,
} from "./features/tracks/track.service.js";

const connectDB = async () => {
  await mongoose.connect(databaseURL);
};

try {
  connectDB();
} catch (err) {
  throw err;
}

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

testCase();
