const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Study",
                "Coding",
                "Work",
                "Exercise",
                "Personal",
                "Project",
                "Other"
            ]
        },

        date: {
            type: Date,
            required: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        plannedMinutes: {
            type: Number,
            default: 0,
            min: 0
        },

        actualMinutes: {
            type: Number,
            default: 0,
            min: 0
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;