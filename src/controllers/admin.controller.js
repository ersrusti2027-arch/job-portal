const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const { sendSuccess, sendError } = require("../utils/response");

// Dashboard Stats

exports.dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    sendSuccess(res, "Dashboard Stats", {
      totalUsers,
      totalJobs,
      totalApplications,
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

// Get All Users

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    sendSuccess(res, "Users Found", users);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Delete User

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return sendError(res, "User Not Found", 404);
    }

    await user.deleteOne();

    sendSuccess(res, "User Deleted");
  } catch (error) {
    sendError(res, error.message);
  }
};

// Get All Jobs

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    sendSuccess(res, "Jobs Found", jobs);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Delete Job

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return sendError(res, "Job Not Found", 404);
    }

    await job.deleteOne();

    sendSuccess(res, "Job Deleted");
  } catch (error) {
    sendError(res, error.message);
  }
};
