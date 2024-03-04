import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { databaseURL, port } from "./src/config/config.js";
import { addCategory } from "./src/modules/categories/category.service.js";
import {
  addAlbum,
  deleteAlbum,
  setTrackDateToAlbum,
} from "./src/modules/albums/album.service.js";
import {
  addTrack,
  deleteTracks,
  findTrackIdsbyAlbumId,
  findLastTrackAddedToAlbum,
} from "./src/modules/tracks/track.service.js";

import categoryRoutes from "./src/modules/categories/category.routes.js";
import albumRoutes from "./src/modules/albums/album.routes.js";
import trackRoutes from "./src/modules/tracks/track.routes.js";
import userRoutes from "./src/modules/user/user.routes.js";

const app = express();

const connectDB = async () => {
  await mongoose.connect(databaseURL);
};

app.use(bodyParser.json());

app.use("/category", categoryRoutes);

app.use("/album", albumRoutes);

app.use("/track", trackRoutes);

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const messages = status == 400 ? error.messages : [error.message];
  res.status(status).send({ messages });
});

try {
  connectDB();
  console.log("App successfully connected to database");
} catch (err) {
  throw err;
}

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

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
