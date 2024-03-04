import express from "express";
import { validate } from "../../global/utils.js";
import {
  addAlbumSchema,
  updatedAlbumSchema,
  deleteAlbumSchema,
  getAlbumByIdSchema,
} from "./album.validation.js";
import { isAuthenticated } from "../user/auth.middleware.js";

import {
  addAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
} from "./album.controller.js";

const router = express.Router();

router.get("/all", getAllAlbums);

router.get("/id", validate(getAlbumByIdSchema), getAlbumById);

router.use("/", isAuthenticated);

router.post("/add", validate(addAlbumSchema), addAlbum);

router.patch("/update", validate(updatedAlbumSchema), updateAlbum);

router.delete("/delete", validate(deleteAlbumSchema), deleteAlbum);

export default router;
