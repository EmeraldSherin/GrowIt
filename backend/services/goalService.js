// backend/services/goalService.js

const Goal = require("../models/Goal");

// ==========================================
// GET ALL GOALS FOR LOGGED-IN USER
// ==========================================

const getAllGoals = async (userId) => {
  const goals = await Goal.find({
    user: userId
  }).sort({ createdAt: -1 });

  return goals;
};

// ==========================================
// CREATE GOAL FOR LOGGED-IN USER
// ==========================================

const createGoal = async (goalData, userId) => {
  const goal = await Goal.create({
    ...goalData,
    user: userId
  });

  return goal;
};

// ==========================================
// UPDATE USER'S GOAL
// ==========================================

const updateGoal = async (id, goalData, userId) => {
  const goal = await Goal.findOneAndUpdate(
    {
      _id: id,
      user: userId
    },
    goalData,
    {
      new: true,
      runValidators: true
    }
  );

  return goal;
};

// ==========================================
// DELETE USER'S GOAL
// ==========================================

const deleteGoal = async (id, userId) => {
  const goal = await Goal.findOneAndDelete({
    _id: id,
    user: userId
  });

  return goal;
};

module.exports = {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal
};