const Activity = require("../models/Activity");


// ==========================================
// GET ALL ACTIVITIES
// ==========================================

const getAllActivities = async () => {

  const activities =
    await Activity.find()
      .sort({ createdAt: -1 });

  return activities;
};


// ==========================================
// CREATE ACTIVITY
// ==========================================

const createActivity = async (
  activityData
) => {

  const activity =
    await Activity.create(
      activityData
    );

  return activity;
};


// ==========================================
// UPDATE ACTIVITY
// ==========================================

const updateActivity = async (
  id,
  activityData
) => {

  const activity =
    await Activity.findByIdAndUpdate(
      id,
      activityData,
      {
        new: true,
        runValidators: true
      }
    );

  return activity;
};


// ==========================================
// DELETE ACTIVITY
// ==========================================

const deleteActivity = async (id) => {

  const activity =
    await Activity.findByIdAndDelete(id);

  return activity;
};


module.exports = {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity
};