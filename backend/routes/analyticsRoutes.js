const express = require("express");

const {
  dailyAnalytics,
  weeklyAnalytics,
  categoryAnalytics,
  streakAnalytics
} = require("../controllers/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/daily",
  authMiddleware,
  dailyAnalytics
);

router.get(
  "/weekly",
  authMiddleware,
  weeklyAnalytics
);

router.get(
  "/categories",
  authMiddleware,
  categoryAnalytics
);

router.get(
  "/streaks",
  authMiddleware,
  streakAnalytics
);

module.exports = router;