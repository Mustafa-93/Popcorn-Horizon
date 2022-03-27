const User = require("../models/User");
const utilities = require("../utilities/utilities");
const Encrypt = require("../utilities/encrypt");
const whoami = (req, res) => {
  return res.json(req.session.user || null);
};
const logout = async (req, res) => {
  try {
    delete req.session.user;
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!utilities.checkPassword(password)) {
      return res
        .status(400)
        .json({ status: "error", message: "User entered invalid password." });
    }
    if (!utilities.checkEmail(email)) {
      return res
        .status(400)
        .json({ status: "error", message: "User entered invalid email." });
    }
    const emailExists = await User.exists({ email: email });
    if (!emailExists) {
      await User.create(req.body, function (err, result) {
        if (err) {
          return res.sendStatus(400);
        } else {
          result.password = undefined;
          req.session.user = result;
          res.status(201).json({
            status: "success",
            message: "Successfully created a new user.",
            data: result,
          });
          return;
        }
      });
    } else {
      res
        .status(409)
        .json({ status: "error", message: `User exists: ${emailExists}` });
      return;
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    throw error;
  }
};
const login = async (req, res) => {
  let userExist = await User.exists({ email: req.body.email });
  if (userExist) {
    let user = await User.findOne({ email: req.body.email }).exec();
    req.body.password = Encrypt(req.body.password);
    if (user.password === req.body.password) {
      req.session.user = user;
      req.session.user.password = undefined;
      req.password = undefined;
      return res.json({
        status: "success",
        message: "login successful",
        loggedInUser: user,
      });
    }
  }
  return res.status(401).json({ status: "error", message: "Bad credentials" });
};
const userUpdate = async (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ status: "error", message: "No user logged in" });
  }
  try {
    if (
      req.body.password !== undefined &&
      !utilities.checkPassword(req.body.password)
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "User entered invalid password." });
    }
    if (req.body.password !== undefined) {
      req.body.password = Encrypt(req.body.password);
    }
    if (req.body.email !== undefined && !utilities.checkEmail(req.body.email)) {
      return res
        .status(400)
        .json({ status: "error", message: "User entered invalid email." });
    }
    const emailExists = await User.exists({ email: req.body.email });
    if (emailExists) {
      return res.status(409).json({
        status: "success",
        message: `User already exists: ${emailExists}`,
      });
    }
    if (!emailExists || req.body.email !== undefined) {
      await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      }).exec(function (error, result) {
        if (error) {
          return res.sendStatus(404);
        } else {
          result.password = undefined;
          req.session.user = result;
          return res.status(200).json({
            status: "success",
            message: "Successfully updated user.",
            data: result,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    throw error;
  }
};
module.exports = {
  whoami,
  register,
  login,
  logout,
  userUpdate,
};
