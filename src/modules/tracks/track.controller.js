import * as service from "./track.service.js";

const addTrack = async (req, res, next) => {
  try {
    await service.addTrack(req.body);
    res.end();
  } catch (err) {
    next(err);
  }
};

const findTracksByAlbumId = async (req, res, next) => {
  try {
    const tracks = await service.findTracksByAlbumId(
      req.body.albumId,
      req.body.categoryId
    );
    res.json(tracks);
  } catch (err) {
    next(err);
  }
};

const deleteTrack = async (req, res, next) => {
  try {
    await service.deleteTrack(req.query.trackId);
    res.end();
  } catch (err) {
    next(err);
  }
};

export { addTrack, deleteTrack, findTracksByAlbumId };
