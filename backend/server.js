const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const activityRoutes = require("./routes/activityRoutes");
const goalRoutes = require("./routes/goalRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "GrowIt Backend is running"
    });
});

app.use("/api/activities", activityRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/auth",authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`GrowIt server running on port ${PORT}`);
});