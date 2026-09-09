const goalService = require("../services/goalService");


// ==========================================
// GET GOALS
// ==========================================

const getGoals = async (req, res) => {

  try {

    const goals =
      await goalService.getAllGoals(
        req.user.userId
      );

    res.status(200).json(goals);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch goals",
      error: error.message
    });
  }
};


// ==========================================
// CREATE GOAL
// ==========================================

const createGoal = async (req, res) => {

  try {

    const goal =
      await goalService.createGoal(
        req.body,
        req.user.userId
      );

    res.status(201).json(goal);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: "Failed to create goal",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE GOAL
// ==========================================

const updateGoal = async (req, res) => {

  try {

    const goal =
      await goalService.updateGoal(
        req.params.id,
        req.body,
        req.user.userId
      );

    if (!goal) {

      return res.status(404).json({
        message: "Goal not found"
      });

    }

    res.status(200).json(goal);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: "Failed to update goal",
      error: error.message
    });
  }
};


// ==========================================
// DELETE GOAL
// ==========================================

const deleteGoal = async (req, res) => {

  try {

    const goal =
      await goalService.deleteGoal(
        req.params.id,
        req.user.userId
      );

    if (!goal) {

      return res.status(404).json({
        message: "Goal not found"
      });

    }

    res.status(200).json({
      message: "Goal deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete goal",
      error: error.message
    });
  }
};


module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
};