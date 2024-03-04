import Joi from "joi";

const addTrackSchema = {
  body: Joi.object({
    name: Joi.string(),
    singer: Joi.string(),
    albumId: Joi.string(),
    categoryId: Joi.string(),
  }),
};

const getTracksByAlbumIdSchema = {
  body: Joi.object({
    albumId: Joi.string(),
    categoryId: Joi.string(),
  }),
};

const deleteTrackSchema = {
  query: Joi.object({
    trackId: Joi.string(),
  }),
};

export { addTrackSchema, getTracksByAlbumIdSchema, deleteTrackSchema };
