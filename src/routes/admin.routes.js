const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const {
  dashboardStats,
  getUsers,
  deleteUser,
  getJobs,
  deleteJob,
} = require("../controllers/admin.controller");

router.get("/dashboard", protect, authorize("admin"), dashboardStats);

router.get("/users", protect, authorize("admin"), getUsers);

router.delete("/users/:id", protect, authorize("admin"), deleteUser);

router.get("/jobs", protect, authorize("admin"), getJobs);

router.delete("/jobs/:id", protect, authorize("admin"), deleteJob);

module.exports = router;
