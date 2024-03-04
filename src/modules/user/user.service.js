import { hash, compare, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import { userErrorMessages } from "../../global/error.messages.js";
import { jwtSecret } from "../../config/config.js";

const signup = async (body) => {
  const { email, name, password, dateOfBirth, location } = body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const err = new Error(userErrorMessages.emailAlreadyInUse.message);
    err.statusCode = userErrorMessages.emailAlreadyInUse.status;
    throw err;
  }

  const hashedPw = await hash(password, 12);
  const user = new User({
    email: email,
    password: hashedPw,
    name: name,
    dateOfBirth: dateOfBirth,
    location: location,
    registrationDate: new Date(),
  });
  const savedUser = await user.save();

  const token = await signUserJwt(savedUser);

  return { token };
};

const login = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email: email });
  if (!user) {
    const err = new Error(userErrorMessages.emailNotFound.message);
    err.statusCode = userErrorMessages.emailNotFound.status;
    throw err;
  }

  const isEqual = compareSync(password, user.password);
  if (!isEqual) {
    const err = new Error(userErrorMessages.wrongPassword.message);
    err.statusCode = userErrorMessages.wrongPassword.status;
    throw err;
  }

  const token = await signUserJwt(user);

  return { token };
};

const signUserJwt = async (user) => {
  const userObj = { ...user }._doc;
  delete userObj.password;

  const token = jwt.sign(userObj, jwtSecret);

  return token;
};

export { signup, login };
