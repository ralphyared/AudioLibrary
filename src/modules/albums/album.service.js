import Album from "./album.model.js";
import { findTrackIdsbyAlbumId } from "../tracks/track.service.js";
import {
  albumErrorMessages,
  commonErrorMessages,
} from "../../global/error.messages.js";

const addAlbum = async (name, description, showNbTracks, userId) => {
  const album = new Album({
    name: name,
    description: description,
    showNbTracks: showNbTracks,
    createdBy: userId,
  });
  await album.save();
  return album._id;
};

const getAllAlbums = async () => {
  return Album.find();
};

const getAlbumById = async (albumId) => {
  const album = await Album.findById(albumId);
  if (!album) {
    const err = new Error(commonErrorMessages.notFound("album").message);
    err.statusCode = commonErrorMessages.notFound("album").status;
    throw err;
  }
  return album;
};

const setTrackDateToAlbum = async (albumId) => {
  await Album.updateOne(
    { _id: albumId },
    { $set: { lastSongAddedAt: new Date() } }
  );
};

const updateAlbum = async (
  albumId,
  name,
  description,
  showNbTracks,
  userId
) => {
  await getAlbumById(albumId);
  await Album.updateOne(
    { _id: albumId },
    {
      $set: { name, description, showNbTracks, updatedBy: userId },
    }
  );
};

const deleteAlbum = async (albumId) => {
  await getAlbumById(albumId);
  const albumTracks = await findTrackIdsbyAlbumId(albumId);
  if (albumTracks?.length) {
    const err = new Error(albumErrorMessages.albumContainsSongs.message);
    err.statusCode = albumErrorMessages.albumContainsSongs.status;
    throw err;
  }
  return Album.deleteOne({ _id: albumId });
};

export {
  addAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  setTrackDateToAlbum,
  deleteAlbum,
};
