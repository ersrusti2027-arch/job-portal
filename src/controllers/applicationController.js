const Application = require("../models/Application");

const Job = require("../models/Job");

const User = require("../models/User");

const sendEmail = require("../services/email.service");

const { sendSuccess, sendError } = require("../utils/response");

// Apply Job

exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return sendError(res, "Job Not Found", 404);
    }

    const alreadyApplied = await Application.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (alreadyApplied) {
      return sendError(res, "Already Applied", 400);
    }

    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
    });

    const candidate = await User.findById(req.user._id);

    const recruiter = await User.findById(job.recruiter);

    // Candidate Mail

    await sendEmail(
      candidate.email,
      "Job Application Submitted",
      `
      <h2>Hello ${candidate.name}</h2>

      <p>
        You have successfully applied for:
      </p>

      <h3>${job.title}</h3>

      <p>
        Company:
        ${job.company}
      </p>
      `,
    );

    // Recruiter Mail

    await sendEmail(
      recruiter.email,
      "New Job Application",
      `
      <h2>Hello ${recruiter.name}</h2>

      <p>
        A new candidate has applied for:
      </p>

      <h3>${job.title}</h3>

      <p>
        Candidate:
        ${candidate.name}
      </p>

      <p>
        Email:
        ${candidate.email}
      </p>
      `,
    );

    sendSuccess(res, "Application Submitted", application, 201);
  } catch (error) {
    sendError(res, error.message);
  }
};

// My Applications

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    }).populate("job");

    sendSuccess(res, "Applications Found", applications);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Recruiter View Applicants

exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Application.find({
      job: req.params.jobId,
    })
      .populate("candidate")
      .populate("job");

    sendSuccess(res, "Applicants Found", applicants);
  } catch (error) {
    sendError(res, error.message);
  }
};

// Update Status

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      },
    )
      .populate("candidate")
      .populate("job");

    await sendEmail(
      application.candidate.email,
      "Application Status Updated",
      `
        <h2>
          Hello ${application.candidate.name}
        </h2>

        <p>
          Your application status for
          <b>
          ${application.job.title}
          </b>
          has been updated.
        </p>

        <h3>
          New Status:
          ${status}
        </h3>
        `,
    );

    sendSuccess(res, "Status Updated", application);
  } catch (error) {
    sendError(res, error.message);
  }
};
