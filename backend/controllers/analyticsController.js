const {
  getDailyAnalytics,
  getWeeklyAnalytics,
  getCategoryAnalytics,
  getStreakAnalytics
} = require("../services/analyticsService");

// ==========================================
// DAILY ANALYTICS
// ==========================================

const dailyAnalytics = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required"
      });
    }

    const data = await getDailyAnalytics(
      req.user.id,
      date
    );

    res.json(data);
  } catch (error) {
    console.error("Daily analytics error:", error);

    res.status(500).json({
      message: "Failed to get daily analytics"
    });
  }
};


// ==========================================
// WEEKLY ANALYTICS
// ==========================================

const weeklyAnalytics = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required"
      });
    }

    const data = await getWeeklyAnalytics(
      req.user.id,
      date
    );

    res.json(data);
  } catch (error) {
    console.error("Weekly analytics error:", error);

    res.status(500).json({
      message: "Failed to get weekly analytics"
    });
  }
};


// ==========================================
// CATEGORY ANALYTICS
// ==========================================

const categoryAnalytics = async (req, res) => {
  try {
    const data = await getCategoryAnalytics(
      req.user.id
    );

    res.json(data);
  } catch (error) {
    console.error(
      "Category analytics error:",
      error
    );

    res.status(500).json({
      message: "Failed to get category analytics"
    });
  }
};


// ==========================================
// STREAK ANALYTICS
// ==========================================

const streakAnalytics = async (req, res) => {
  try {
    const data = await getStreakAnalytics(
      req.user.id
    );

    res.json(data);
  } catch (error) {
    console.error(
      "Streak analytics error:",
      error
    );

    res.status(500).json({
      message: "Failed to get streak analytics"
    });
  }
};


module.exports = {
  dailyAnalytics,
  weeklyAnalytics,
  categoryAnalytics,
  streakAnalytics
};