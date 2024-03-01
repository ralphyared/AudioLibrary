import Track from "./track.model.js";

const addTrack = async (name, singer, categoryId, albumId) => {
  const track = new Track({
    name: name,
    singer: singer,
    categoryId: categoryId,
    albumId: albumId,
  });
  await track.save();
};

const findTrackIdsbyAlbumId = async (albumId) => {
  const trackIds = [];
  const results = await Track.find({ albumId: albumId }, { _id: 1 });
  results.map((result) => {
    trackIds.push(result._id);
  });
  return trackIds;
};

const findLastTrackAddedToAlbum = async (albumId) => {
  const tracks = await Track.find({ albumId: albumId }, { createdAt: 1 }).sort({
    createdAt: -1,
  });
  return tracks[0]?._id;
};

const deleteTracks = async (trackIds) => {
  await Track.deleteMany({ _id: { $in: trackIds } });
};

export {
  addTrack,
  findTrackIdsbyAlbumId,
  findLastTrackAddedToAlbum,
  deleteTracks,
};
