const Job = require("../models/Job");

const { sendSuccess, sendError } = require("../utils/response");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      recruiter: req.user._id,
    });

    sendSuccess(res, "Job Created Successfully", job, 201);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name email").sort({
      createdAt: -1,
    });

    sendSuccess(res, "Jobs Found", jobs);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Get Single Job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "recruiter",
      "name email",
    );

    if (!job) {
      return sendError(res, "Job Not Found", 404);
    }

    sendSuccess(res, "Job Found", job);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return sendError(res, "Job Not Found", 404);
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return sendError(res, "Unauthorized", 403);
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    sendSuccess(res, "Job Updated", updatedJob);
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

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return sendError(res, "Unauthorized", 403);
    }

    await job.deleteOne();

    sendSuccess(res, "Job Deleted");
  } catch (error) {
    sendError(res, error.message);
  }
};

// Recruiter Jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user._id,
    });

    sendSuccess(res, "Recruiter Jobs", jobs);
  } catch (error) {
    sendError(res, error.message);
  }
};
