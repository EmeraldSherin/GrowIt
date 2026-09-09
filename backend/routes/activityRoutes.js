const express = require("express");

const {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity
} = require("../controllers/activityController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createActivity
);

router.get(
  "/",
  authMiddleware,
  getActivities
);

router.put(
  "/:id",
  authMiddleware,
  updateActivity
);

router.delete(
  "/:id",
  authMiddleware,
  deleteActivity
);

module.exports = router;