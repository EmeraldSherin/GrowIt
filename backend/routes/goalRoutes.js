const express = require("express");

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getRecurringGoalProgress
} = require("../controllers/goalController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getGoals
);

router.post(
  "/",
  authMiddleware,
  createGoal
);

router.get(
  "/:id/progress",
  authMiddleware,
  getRecurringGoalProgress
);

router.put(
  "/:id",
  authMiddleware,
  updateGoal
);

router.delete(
  "/:id",
  authMiddleware,
  deleteGoal
);

module.exports = router;