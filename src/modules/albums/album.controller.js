import * as service from "./album.service.js";

const addAlbum = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const name = req.body.name;
    const description = req.body.description;
    const showNbTracks = req.body.showNbTracks;
    await service.addAlbum(name, description, showNbTracks, userId);
    res.end();
  } catch (err) {
    next(err);
  }
};

const getAllAlbums = async (req, res, next) => {
  const albumList = await service.getAllAlbums();
  res.json(albumList);
};

const getAlbumById = async (req, res, next) => {
  try {
    const albumId = req.query.albumId;
    const albumFound = await service.getAlbumById(albumId);
    res.json(albumFound);
  } catch (err) {
    next(err);
  }
};

const updateAlbum = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const albumId = req.query.albumId;
    const name = req.body.name;
    const description = req.body.description;
    const showNbTracks = req.body.showNbTracks;

    const updatedAlbum = await service.updateAlbum(
      albumId,
      name,
      description,
      showNbTracks,
      userId
    );
    res.json(updatedAlbum);
  } catch (err) {
    next(err);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const albumId = req.query.albumId;
    await service.deleteAlbum(albumId);
    res.end();
  } catch (err) {
    next(err);
  }
};

export { addAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum };
