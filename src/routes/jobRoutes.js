const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} = require("../controllers/jobController");

// Public
router.get("/", getJobs);

router.get("/:id", getJobById);

// Recruiter
router.post("/", protect, authorize("recruiter", "admin"), createJob);

router.get(
  "/recruiter/my-jobs",
  protect,
  authorize("recruiter", "admin"),
  getMyJobs,
);

router.put("/:id", protect, authorize("recruiter", "admin"), updateJob);

router.delete("/:id", protect, authorize("recruiter", "admin"), deleteJob);

module.exports = router;
