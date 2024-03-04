import Joi from "joi";

const addAlbumSchema = {
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    showNbTracks: Joi.boolean(),
  }),
};

const updatedAlbumSchema = {
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    showNbTracks: Joi.boolean().optional(),
  }),
};

const getAlbumByIdSchema = {
  query: Joi.object({
    albumId: Joi.string(),
  }),
};

const deleteAlbumSchema = {
  query: Joi.object({
    albumId: Joi.string(),
  }),
};

export {
  addAlbumSchema,
  updatedAlbumSchema,
  getAlbumByIdSchema,
  deleteAlbumSchema,
};
