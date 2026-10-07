const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    /*
     * long-term:
     * Existing goal behaviour.
     *
     * recurring:
     * Progress is calculated from activities.
     */
    type: {
      type: String,
      enum: ["long-term", "recurring"],
      default: "long-term"
    },

    /*
     * Used by recurring goals.
     */
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily"
    },

    /*
     * For recurring goals:
     * minutes or activities
     */
    unit: {
      type: String,
      enum: ["activities", "minutes"],
      default: "activities"
    },

    /*
     * Recurring goals can optionally
     * track one activity category.
     */
    category: {
      type: String,
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

    target: {
      type: Number,
      required: true,
      min: 1
    },

    /*
     * Used primarily by long-term goals.
     *
     * Recurring goal progress is calculated
     * from activities rather than stored here.
     */
    progress: {
      type: Number,
      default: 0,
      min: 0
    },

    deadline: {
      type: Date
    },

    status: {
      type: String,
      enum: [
        "Not Started",
        "In Progress",
        "Completed"
      ],
      default: "Not Started"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Goal", goalSchema);