import Album from "./album.model.js";

const addAlbum = async (name, description, showNbTracks) => {
  const album = new Album({
    name: name,
    description: description,
    showNbTracks: showNbTracks,
  });
  await album.save();
  return album._id;
};

const getAllAlbums = async () => {
  return Album.find();
};

const getAlbumById = async (albumId) => {
  return Album.findById(albumId);
};

const setTrackDateToAlbum = async (albumId) => {
  await Album.updateOne(
    { _id: albumId },
    { $set: { lastSongAddedAt: new Date() } }
  );
};

const updateAlbum = async (albumId, name, description, showNbTracks) => {
  await Album.updateOne(
    { _id: albumId },
    {
      $set: name,
      description,
      showNbTracks,
    }
  );
};

const deleteAlbum = async (albumId) => {
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
