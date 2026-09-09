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

    target: {
      type: Number,
      required: true,
      min: 1
    },

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

module.exports = mongoose.model(
  "Goal",
  goalSchema
);