import Track from "./track.model.js";
import { getAlbumById } from "../albums/album.service.js";
import { getCategoryById } from "../categories/category.service.js";
import { commonErrorMessages } from "../../global/error.messages.js";

const addTrack = async (body) => {
  try {
    const { name, singer, categoryId, albumId } = body;

    await getAlbumById(albumId);
    await getCategoryById(categoryId);

    const track = new Track({
      name: name,
      singer: singer,
      categoryId: categoryId,
      albumId: albumId,
    });
    await track.save();
  } catch (err) {
    throw err;
  }
};

const findTracksByAlbumId = async (albumId, categoryId) => {
  return Track.find({ albumId, categoryId }, {}, { sort: { createdAt: -1 } });
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

const deleteTrack = async (trackId) => {
  const track = await Track.findById(trackId);
  if (!track) {
    const err = new Error(commonErrorMessages.notFound("track").message);
    err.statusCode = commonErrorMessages.notFound("track").status;
    throw err;
  }
  await Track.deleteOne({ _id: trackId });
};

const deleteTracks = async (trackIds) => {
  await Track.deleteMany({ _id: { $in: trackIds } });
};

export {
  addTrack,
  findTrackIdsbyAlbumId,
  findTracksByAlbumId,
  findLastTrackAddedToAlbum,
  deleteTrack,
  deleteTracks,
};
