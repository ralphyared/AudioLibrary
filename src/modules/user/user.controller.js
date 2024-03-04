import * as service from "./user.service.js";

const signup = async (req, res, next) => {
  try {
    const token = await service.signup(req.body);
    res.send(token);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await service.login(req.body);
    res.send(token);
  } catch (err) {
    next(err);
  }
};

export { signup, login };
