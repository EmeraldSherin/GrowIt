const Activity = require("../models/Activity");

// ==========================================
// GET DAILY ANALYTICS
// ==========================================

const getDailyAnalytics = async (userId, date) => {
  const selectedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    throw new Error("Invalid date");
  }

  const nextDate = new Date(selectedDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const activities = await Activity.find({
    user: userId,
    date: {
      $gte: selectedDate,
      $lt: nextDate
    }
  });

  const totalActivities = activities.length;

  const completedActivities = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const pendingActivities = activities.filter(
    (activity) => activity.status === "Pending"
  ).length;

  const inProgressActivities = activities.filter(
    (activity) => activity.status === "In Progress"
  ).length;

  const plannedMinutes = activities.reduce(
    (total, activity) =>
      total + Number(activity.plannedMinutes || 0),
    0
  );

  const actualMinutes = activities.reduce(
    (total, activity) =>
      total + Number(activity.actualMinutes || 0),
    0
  );

  const completionRate =
    totalActivities > 0
      ? Math.round(
          (completedActivities / totalActivities) * 100
        )
      : 0;

  const timeEfficiency =
    plannedMinutes > 0
      ? Math.round(
          (actualMinutes / plannedMinutes) * 100
        )
      : 0;

  return {
    date,
    totalActivities,
    completedActivities,
    pendingActivities,
    inProgressActivities,
    completionRate,
    plannedMinutes,
    actualMinutes,
    timeEfficiency
  };
};


// ==========================================
// GET WEEKLY ANALYTICS
// ==========================================

const getWeeklyAnalytics = async (userId, date) => {
  const selectedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    throw new Error("Invalid date");
  }

  // Monday = first day of the week
  const dayOfWeek = selectedDate.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  const startDate = new Date(selectedDate);
  startDate.setDate(
    startDate.getDate() - daysSinceMonday
  );

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  const activities = await Activity.find({
    user: userId,
    date: {
      $gte: startDate,
      $lt: endDate
    }
  });

  const totalActivities = activities.length;

  const completedActivities = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const pendingActivities = activities.filter(
    (activity) => activity.status === "Pending"
  ).length;

  const inProgressActivities = activities.filter(
    (activity) => activity.status === "In Progress"
  ).length;

  const plannedMinutes = activities.reduce(
    (total, activity) =>
      total + Number(activity.plannedMinutes || 0),
    0
  );

  const actualMinutes = activities.reduce(
    (total, activity) =>
      total + Number(activity.actualMinutes || 0),
    0
  );

  const completionRate =
    totalActivities > 0
      ? Math.round(
          (completedActivities / totalActivities) * 100
        )
      : 0;

  const timeEfficiency =
    plannedMinutes > 0
      ? Math.round(
          (actualMinutes / plannedMinutes) * 100
        )
      : 0;

  return {
    period: "weekly",
    startDate: startDate.toISOString().slice(0, 10),
    endDate: new Date(
      endDate.getTime() - 1
    )
      .toISOString()
      .slice(0, 10),

    totalActivities,
    completedActivities,
    pendingActivities,
    inProgressActivities,
    completionRate,
    plannedMinutes,
    actualMinutes,
    timeEfficiency
  };
};


// ==========================================
// GET CATEGORY ANALYTICS
// ==========================================

const getCategoryAnalytics = async (userId) => {
  const activities = await Activity.find({
    user: userId
  });

  const categories = {};

  activities.forEach((activity) => {
    const category = activity.category;

    if (!categories[category]) {
      categories[category] = {
        category,
        totalActivities: 0,
        completedActivities: 0,
        plannedMinutes: 0,
        actualMinutes: 0
      };
    }

    categories[category].totalActivities += 1;

    if (activity.status === "Completed") {
      categories[category].completedActivities += 1;
    }

    categories[category].plannedMinutes += Number(
      activity.plannedMinutes || 0
    );

    categories[category].actualMinutes += Number(
      activity.actualMinutes || 0
    );
  });

  return Object.values(categories).map((item) => ({
    ...item,

    completionRate:
      item.totalActivities > 0
        ? Math.round(
            (item.completedActivities /
              item.totalActivities) *
              100
          )
        : 0
  }));
};


// ==========================================
// GET STREAK / CONSISTENCY ANALYTICS
// ==========================================

const getStreakAnalytics = async (userId) => {
  const activities = await Activity.find({
    user: userId,
    status: "Completed"
  }).sort({ date: 1 });

  if (activities.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      activeDays: 0,
      consistencyRate: 0
    };
  }

  // Get unique completed dates.
  const completedDates = [
    ...new Set(
      activities.map((activity) =>
        new Date(activity.date)
          .toISOString()
          .slice(0, 10)
      )
    )
  ];

  let longestStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < completedDates.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const previous = new Date(
        `${completedDates[i - 1]}T00:00:00`
      );

      const current = new Date(
        `${completedDates[i]}T00:00:00`
      );

      const difference =
        (current - previous) /
        (1000 * 60 * 60 * 24);

      if (difference === 1) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    longestStreak = Math.max(
      longestStreak,
      currentStreak
    );
  }

  // Calculate current streak from the latest completed date.
  const latestDate =
    completedDates[completedDates.length - 1];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latest = new Date(
    `${latestDate}T00:00:00`
  );

  const daysFromToday =
    (today - latest) /
    (1000 * 60 * 60 * 24);

  if (daysFromToday > 1) {
    currentStreak = 0;
  }

  return {
    currentStreak,
    longestStreak,
    activeDays: completedDates.length,
    consistencyRate: 0
  };
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getDailyAnalytics,
  getWeeklyAnalytics,
  getCategoryAnalytics,
  getStreakAnalytics
};