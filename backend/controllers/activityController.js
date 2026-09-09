const Activity = require("../models/Activity");


// ==========================================
// CREATE ACTIVITY
// ==========================================

const createActivity = async (req, res) => {

    try {

        const activity = await Activity.create({
            ...req.body,
            user: req.user.userId
        });

        res.status(201).json(activity);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ==========================================
// GET ACTIVITIES
// ==========================================

const getActivities = async (req, res) => {

    try {

        const activities =
            await Activity.find({
                user: req.user.userId
            });

        res.status(200).json(activities);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ==========================================
// UPDATE ACTIVITY
// ==========================================

const updateActivity = async (req, res) => {

    try {

        const activity =
            await Activity.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.userId
                },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!activity) {

            return res.status(404).json({
                message: "Activity not found"
            });

        }

        res.status(200).json(activity);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ==========================================
// DELETE ACTIVITY
// ==========================================

const deleteActivity = async (req, res) => {

    try {

        const activity =
            await Activity.findOneAndDelete({
                _id: req.params.id,
                user: req.user.userId
            });

        if (!activity) {

            return res.status(404).json({
                message: "Activity not found"
            });

        }

        res.status(200).json({
            message: "Activity deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    createActivity,
    getActivities,
    updateActivity,
    deleteActivity
};