const isSameDate = (activityDate, date) => {
  if (!activityDate || !date) {
    return false;
  }

  const activityDateObject = new Date(activityDate);

  if (isNaN(activityDateObject.getTime())) {
    return false;
  }

  const activityDateKey =
    activityDateObject.toISOString().split("T")[0];

  const dateKey =
    typeof date === "string"
      ? date
      : new Date(date).toISOString().split("T")[0];

  return activityDateKey === dateKey;
};

// ==========================================
// DAILY STATISTICS
// ==========================================

export const getDailyStats = (activities, date) => {

  const dateKey =
    typeof date === "string"
      ? date
      : date.toISOString().split("T")[0];

  const dailyActivities = activities.filter(
    (activity) =>
      isSameDate(activity.date, dateKey)
  );

  const total = dailyActivities.length;

  const completed = dailyActivities.filter(
    (activity) =>
      activity.status === "Completed"
  ).length;

  const pending = dailyActivities.filter(
    (activity) =>
      activity.status === "Pending"
  ).length;

  const inProgress = dailyActivities.filter(
    (activity) =>
      activity.status === "In Progress"
  ).length;

  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return {
    total,
    completed,
    pending,
    inProgress,
    completionRate
  };
};


// ==========================================
// LAST 7 DAYS
// ==========================================

export const getLast7Days = () => {

  const days = [];

  const today = new Date();

  for (let i = 6; i >= 0; i--) {

    const date = new Date(today);

    date.setDate(
      today.getDate() - i
    );

    days.push(
      date.toISOString().split("T")[0]
    );
  }

  return days;
};


// ==========================================
// LAST 30 DAYS
// ==========================================

export const getLast30Days = () => {

  const days = [];

  const today = new Date();

  for (let i = 29; i >= 0; i--) {

    const date = new Date(today);

    date.setDate(
      today.getDate() - i
    );

    days.push(
      date.toISOString().split("T")[0]
    );
  }

  return days;
};


// ==========================================
// LAST 365 DAYS
// ==========================================

export const getLast365Days = () => {

  const days = [];

  const today = new Date();

  for (let i = 364; i >= 0; i--) {

    const date = new Date(today);

    date.setDate(
      today.getDate() - i
    );

    days.push(
      date.toISOString().split("T")[0]
    );
  }

  return days;
};


// ==========================================
// WEEKLY STATISTICS
// ==========================================

export const getWeeklyStats = (activities) => {

  const days = getLast7Days();

  let totalActivities = 0;
  let completedActivities = 0;
  let plannedMinutes = 0;
  let actualMinutes = 0;

  days.forEach((date) => {

    const stats =
      getDailyStats(
        activities,
        date
      );

    totalActivities +=
      stats.total;

    completedActivities +=
      stats.completed;

    const dailyActivities =
      activities.filter(
        (activity) =>
          isSameDate(activity.date, date)
      );

    dailyActivities.forEach(
      (activity) => {

        plannedMinutes +=
          Number(
            activity.plannedMinutes || 0
          );

        actualMinutes +=
          Number(
            activity.actualMinutes || 0
          );

      }
    );

  });

  const completionRate =
    totalActivities === 0
      ? 0
      : Math.round(
          (completedActivities /
            totalActivities) *
            100
        );

  const averageDailyCompletion =
    Math.round(
      days.reduce(
        (sum, date) =>
          sum +
          getDailyStats(
            activities,
            date
          ).completionRate,
        0
      ) / 7
    );

  return {

    totalActivities,

    completedActivities,

    completionRate,

    plannedMinutes,

    actualMinutes,

    averageDailyCompletion

  };
};


// ==========================================
// DAILY PERFORMANCE SCORE
// ==========================================

export const getDailyPerformanceScore = (
  activities,
  date
) => {

  const stats =
    getDailyStats(
      activities,
      date
    );

  // No activity
  if (stats.total === 0) {
    return 0;
  }

  // ----------------------------------------
  // COMPLETION SCORE - 70%
  // ----------------------------------------

  const completionScore =
    stats.completionRate * 0.7;

  // ----------------------------------------
  // GET DAILY ACTIVITIES
  // ----------------------------------------

  const dateKey =
    typeof date === "string"
      ? date
      : date.toISOString().split("T")[0];

  const dailyActivities =
    activities.filter(
      (activity) =>
        isSameDate(activity.date, dateKey)
    );

  // ----------------------------------------
  // PLANNED TIME
  // ----------------------------------------

  const plannedMinutes =
    dailyActivities.reduce(
      (total, activity) =>
        total +
        Number(
          activity.plannedMinutes || 0
        ),
      0
    );

  // ----------------------------------------
  // ACTUAL TIME
  // ----------------------------------------

  const actualMinutes =
    dailyActivities.reduce(
      (total, activity) =>
        total +
        Number(
          activity.actualMinutes || 0
        ),
      0
    );

  // ----------------------------------------
  // TIME EFFICIENCY - 30%
  // ----------------------------------------

  let timeEfficiency = 0;

  if (plannedMinutes > 0) {

    const timeDifference =
      Math.abs(
        actualMinutes -
        plannedMinutes
      );

    timeEfficiency =
      Math.max(
        0,
        100 -
          (timeDifference /
            plannedMinutes) *
            100
      );
  }

  const timeScore =
    timeEfficiency * 0.3;

  // ----------------------------------------
  // FINAL SCORE
  // ----------------------------------------

  const performanceScore =
    Math.round(
      completionScore +
      timeScore
    );

  return performanceScore;
};


// ==========================================
// STREAK STATISTICS
// ==========================================

export const getStreakStats = (
  activities
) => {

  const days =
    getLast365Days();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let activeDays = 0;

  // ----------------------------------------
  // LONGEST STREAK
  // ----------------------------------------

  days.forEach((date) => {

    const dailyActivities =
      activities.filter(
        (activity) =>
          isSameDate(activity.date, date)
      );

    const score =
      getDailyPerformanceScore(
        activities,
        date
      );

    const isConsistent =
      dailyActivities.length > 0 &&
      score >= 50;

    if (isConsistent) {

      activeDays++;

      tempStreak++;

      if (
        tempStreak >
        longestStreak
      ) {

        longestStreak =
          tempStreak;

      }

    } else {

      tempStreak = 0;

    }

  });

  // ----------------------------------------
  // CURRENT STREAK
  // ----------------------------------------

  currentStreak = 0;

  for (
    let i = days.length - 1;
    i >= 0;
    i--
  ) {

    const date = days[i];

    const dailyActivities =
      activities.filter(
        (activity) =>
          isSameDate(activity.date, date)
      );

    const score =
      getDailyPerformanceScore(
        activities,
        date
      );

    const isConsistent =
      dailyActivities.length > 0 &&
      score >= 50;

    if (isConsistent) {

      currentStreak++;

    } else {

      break;

    }

  }

  // ----------------------------------------
  // CONSISTENCY RATE
  // ----------------------------------------

  const consistencyRate =
    Math.round(
      (activeDays /
        days.length) *
        100
    );

  return {

    currentStreak,

    longestStreak,

    activeDays,

    consistencyRate

  };
};


// ==========================================
// CONSISTENCY RATE
// ==========================================

export const getConsistencyRate = (
  activities,
  numberOfDays
) => {

  const today = new Date();

  let activeDays = 0;

  for (
    let i = 0;
    i < numberOfDays;
    i++
  ) {

    const date =
      new Date(today);

    date.setDate(
      today.getDate() - i
    );

    const dateKey =
      date.toISOString()
        .split("T")[0];

    const dailyActivities =
      activities.filter(
        (activity) =>
          isSameDate(activity.date, dateKey)
      );

    const score =
      getDailyPerformanceScore(
        activities,
        dateKey
      );

    if (
      dailyActivities.length > 0 &&
      score >= 50
    ) {

      activeDays++;

    }

  }

  return Math.round(
    (activeDays /
      numberOfDays) *
      100
  );
};


// ==========================================
// CATEGORY STATISTICS
// ==========================================

export const getCategoryStats = (
  activities
) => {

  const categories = {};

  activities.forEach(
    (activity) => {

      const category =
        activity.category ||
        "Other";

      if (!categories[category]) {

        categories[category] = {

          total: 0,

          completed: 0,

          plannedMinutes: 0,

          actualMinutes: 0

        };

      }

      categories[category].total++;

      if (
        activity.status ===
        "Completed"
      ) {

        categories[
          category
        ].completed++;

      }

      categories[
        category
      ].plannedMinutes +=
        Number(
          activity.plannedMinutes ||
          0
        );

      categories[
        category
      ].actualMinutes +=
        Number(
          activity.actualMinutes ||
          0
        );

    }
  );

  return Object.entries(
    categories
  ).map(
    ([category, data]) => {

      const completionRate =
        data.total === 0
          ? 0
          : Math.round(
              (data.completed /
                data.total) *
                100
            );

      return {

        category,

        total:
          data.total,

        completed:
          data.completed,

        completionRate,

        plannedMinutes:
          data.plannedMinutes,

        actualMinutes:
          data.actualMinutes

      };

    }
  );
};


// ==========================================
// 30-DAY STATISTICS
// ==========================================

export const get30DayStats = (
  activities
) => {

  const days =
    getLast30Days();

  let totalActivities = 0;
  let completedActivities = 0;
  let plannedMinutes = 0;
  let actualMinutes = 0;
  let activeDays = 0;

  const dailyScores = [];

  // ----------------------------------------
  // PROCESS EACH DAY
  // ----------------------------------------

  days.forEach((date) => {

    const dailyActivities =
      activities.filter(
        (activity) =>
          isSameDate(activity.date, date)
      );

    // Active day
    if (
      dailyActivities.length > 0
    ) {

      activeDays++;

    }

    // Total activities
    totalActivities +=
      dailyActivities.length;

    // Completed activities
    completedActivities +=
      dailyActivities.filter(
        (activity) =>
          activity.status ===
          "Completed"
      ).length;

    // Time
    dailyActivities.forEach(
      (activity) => {

        plannedMinutes +=
          Number(
            activity.plannedMinutes ||
            0
          );

        actualMinutes +=
          Number(
            activity.actualMinutes ||
            0
          );

      }
    );

    // Daily performance
    dailyScores.push({

      date,

      score:
        getDailyPerformanceScore(
          activities,
          date
        )

    });

  });

  // ----------------------------------------
  // COMPLETION RATE
  // ----------------------------------------

  const completionRate =
    totalActivities === 0
      ? 0
      : Math.round(
          (completedActivities /
            totalActivities) *
            100
        );

  // ----------------------------------------
  // AVERAGE DAILY SCORE
  // ONLY ACTIVE DAYS
  // ----------------------------------------

  const activeScores =
    dailyScores.filter(
      (item) =>
        item.score > 0
    );

  const averageDailyScore =
    activeScores.length === 0
      ? 0
      : Math.round(
          activeScores.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / activeScores.length
        );

  // ----------------------------------------
  // TIME EFFICIENCY
  // ----------------------------------------

  let timeEfficiency = 100;

  if (
    plannedMinutes > 0
  ) {

    const timeDifference =
      Math.abs(
        actualMinutes -
        plannedMinutes
      );

    timeEfficiency =
      Math.max(
        0,
        Math.round(
          100 -
            (timeDifference /
              plannedMinutes) *
              100
        )
      );

  }

  // ----------------------------------------
  // RETURN
  // ----------------------------------------

  return {

    totalActivities,

    completedActivities,

    completionRate,

    plannedMinutes,

    actualMinutes,

    activeDays,

    averageDailyScore,

    timeEfficiency,

    dailyScores

  };

};