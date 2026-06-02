const User = require("../models/User");

const { sendSuccess, sendError } = require("../utils/response");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    sendSuccess(res, "Profile Found", user);
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, skills, resume } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        skills,
        resume,
      },
      {
        new: true,
      },
    );

    sendSuccess(res, "Profile Updated", user);
  } catch (error) {
    sendError(res, error.message);
  }
};
