const Activity = require("../models/Activity");

const createActivity = async (req, res) => {
    try {
        const activity = await Activity.create(req.body);

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find();

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(
            req.params.id,
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

const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(
            req.params.id
        );

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