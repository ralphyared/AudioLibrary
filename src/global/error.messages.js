export const commonErrorMessages = {
  notFound: (modelName) => ({
    status: 404,
    message: `This ${modelName} does not exist`,
  }),
};

export const albumErrorMessages = {
  albumContainsSongs: {
    status: 409,
    message: "The album you are trying to delete still contains songs",
  },
};

export const userErrorMessages = {
  emailAlreadyInUse: {
    status: 409,
    message: "The email you are using is already in use",
  },
  emailNotFound: {
    status: 404,
    message: "The email you are using does not exist",
  },
  wrongPassword: {
    status: 401,
    message: "Incorrect password",
  },
  notAuthenticated: {
    status: 401,
    message: "Not authenticated",
  },
};
