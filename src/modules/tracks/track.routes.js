import express from "express";
import { validate } from "../../global/utils.js";
import {
  addTrack,
  deleteTrack,
  findTracksByAlbumId,
} from "./track.controller.js";
import {
  addTrackSchema,
  getTracksByAlbumIdSchema,
  deleteTrackSchema,
} from "./tracks.validation.js";
import { isAuthenticated } from "../user/auth.middleware.js";

const router = express.Router();

router.post("/add", isAuthenticated, validate(addTrackSchema), addTrack);

router.get(
  "/getSortedTracks",
  isAuthenticated,
  validate(getTracksByAlbumIdSchema),
  findTracksByAlbumId
);

router.delete(
  "/delete",
  isAuthenticated,
  validate(deleteTrackSchema),
  deleteTrack
);

export default router;
