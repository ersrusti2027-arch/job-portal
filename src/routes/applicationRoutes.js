const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
} = require("../controllers/applicationController");

// Candidate

router.post("/apply/:jobId", protect, authorize("candidate"), applyJob);

router.get("/my", protect, authorize("candidate"), getMyApplications);

// Recruiter

router.get(
  "/applicants/:jobId",
  protect,
  authorize("recruiter", "admin"),
  getApplicants,
);

router.put(
  "/status/:id",
  protect,
  authorize("recruiter", "admin"),
  updateStatus,
);

module.exports = router;
