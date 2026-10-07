// backend/services/goalService.js

const Goal = require("../models/Goal");
const Activity = require("../models/Activity");

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


const getRecurringGoalProgress = async (
  goalId,
  userId,
  date
) => {
  const goal = await Goal.findOne({
    _id: goalId,
    user: userId
  });

  if (!goal) {
    return null;
  }

  // Long-term goals use their manually maintained progress.
  if (goal.type !== "recurring") {
    const progress = Number(goal.progress || 0);

    return {
      goalId: goal._id,
      type: goal.type,
      progress,
      target: goal.target,
      percentage:
        goal.target > 0
          ? Math.min(
              Math.round((progress / goal.target) * 100),
              100
            )
          : 0,
      completed: progress >= goal.target
    };
  }

  // Parse the selected date using local calendar dates.
  const selectedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    throw new Error("Invalid date supplied for goal progress");
  }

  let startDate = new Date(selectedDate);
  let endDate = new Date(selectedDate);

  if (goal.frequency === "weekly") {
    // Monday is the first day of the week.
    const dayOfWeek = startDate.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;

    startDate.setDate(startDate.getDate() - daysSinceMonday);
    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);
  } else {
    // Daily goals cover the selected calendar day.
    endDate.setDate(endDate.getDate() + 1);
  }

  const activityFilter = {
    user: userId,
    date: {
      $gte: startDate,
      $lt: endDate
    },
    status: "Completed"
  };

  // Only include activities matching the goal's category,
  // if the goal has a category selected.
  if (goal.category) {
    activityFilter.category = goal.category;
  }

  const activities = await Activity.find(activityFilter);

  let progress = 0;

  if (goal.unit === "minutes") {
    progress = activities.reduce(
      (total, activity) =>
        total + Number(activity.actualMinutes || 0),
      0
    );
  } else {
    progress = activities.length;
  }

  const percentage =
    goal.target > 0
      ? Math.min(
          Math.round((progress / goal.target) * 100),
          100
        )
      : 0;

  return {
    goalId: goal._id,
    title: goal.title,
    type: goal.type,
    frequency: goal.frequency,
    unit: goal.unit,
    category: goal.category || null,
    date,
    periodStart: startDate.toISOString().slice(0, 10),
    periodEnd: new Date(
      endDate.getTime() - 1
    ).toISOString().slice(0, 10),
    progress,
    target: goal.target,
    percentage,
    completed: progress >= goal.target
  };
};


module.exports = {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getRecurringGoalProgress
};