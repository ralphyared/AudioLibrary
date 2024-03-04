import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/config.js";
import { userErrorMessages } from "../../global/error.messages.js";

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error(userErrorMessages.notAuthenticated.message);
    error.statusCode = userErrorMessages.notAuthenticated.status;
    next(error);
    return;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, jwtSecret);
  } catch (err) {
    const error = new Error(userErrorMessages.notAuthenticated.message);
    error.statusCode = userErrorMessages.notAuthenticated.status;
    next(error);
    return;
  }

  req.user = decodedToken;
  next();
};
