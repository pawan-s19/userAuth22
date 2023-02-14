const userModel = require("../models/userModel");
const sendToken = require("../utils/acquireJWTToken");

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ messsage: "Missing credentials" });
    }

    let user = await userModel.findOne({ username }).select("+password");

    if (!user) {
      user = await userModel.create({ username, password });
    }

    const matchingUserPassword = await user.comparePassword(password);

    if (!matchingUserPassword)
      return res
        .status(500)
        .json({ messsage: "user not found ! invalid credentials" });

    sendToken(user, 200, res);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });

    if (!user) return res.status(500).json({ message: "user not found" });

    res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json(err);
  }
};
