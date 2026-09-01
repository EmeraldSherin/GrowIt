export const getDailyStats = (activities, date) => {
  const dateKey =
    typeof date === "string"
      ? date
      : date.toISOString().split("T")[0];

  const dailyActivities = activities.filter(
    (activity) =>
      activity.date.startsWith(dateKey)
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
      : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    inProgress,
    completionRate
  };
};

export const getLast7Days = () => {
  const days = [];

  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    days.push(
      date.toISOString().split("T")[0]
    );
  }

  return days;
};
export const getLast365Days = () => {
  const days = [];

  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    days.push(
      date.toISOString().split("T")[0]
    );
  }

  return days;
};


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

    totalActivities += stats.total;

    completedActivities +=
      stats.completed;

    const dailyActivities =
      activities.filter(
        (activity) =>
          activity.date.startsWith(date)
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

export const getDailyPerformanceScore = (activities, date) => {

  const stats = getDailyStats(activities, date);

  // No activity on this day
  if (stats.total === 0) {
    return 0;
  }

  // 70% comes from completing activities
  const completionScore =
    stats.completionRate * 0.7;

  // Get activities for this date
  const dateKey =
    typeof date === "string"
      ? date
      : date.toISOString().split("T")[0];

  const dailyActivities = activities.filter(
    (activity) =>
      activity.date.startsWith(dateKey)
  );

  const plannedMinutes =
    dailyActivities.reduce(
      (total, activity) =>
        total +
        Number(activity.plannedMinutes || 0),
      0
    );

  const actualMinutes =
    dailyActivities.reduce(
      (total, activity) =>
        total +
        Number(activity.actualMinutes || 0),
      0
    );

  // 30% comes from time efficiency
  let timeEfficiency = 0;

  if (plannedMinutes > 0) {
    timeEfficiency =
      Math.min(
        (actualMinutes / plannedMinutes) * 100,
        100
      );
  }

  const timeScore =
    timeEfficiency * 0.3;

  const performanceScore =
    Math.round(
      completionScore + timeScore
    );

  return performanceScore;
};
export const getStreakStats = (activities) => {

  const days = getLast365Days();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  let activeDays = 0;

  days.forEach((date) => {

    const dailyActivities =
      activities.filter(
        (activity) =>
          activity.date.startsWith(date)
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

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }

    } else {

      tempStreak = 0;
    }
  });

  // Calculate current streak from today backwards
  currentStreak = 0;

  for (let i = days.length - 1; i >= 0; i--) {

    const date = days[i];

    const dailyActivities =
      activities.filter(
        (activity) =>
          activity.date.startsWith(date)
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

  const consistencyRate =
    Math.round(
      (activeDays / days.length) * 100
    );

  return {
    currentStreak,
    longestStreak,
    activeDays,
    consistencyRate
  };
};
export const getConsistencyRate = (activities, numberOfDays) => {

  const today = new Date();

  let activeDays = 0;

  for (let i = 0; i < numberOfDays; i++) {

    const date = new Date(today);

    date.setDate(today.getDate() - i);

    const dateKey =
      date.toISOString().split("T")[0];

    const dailyActivities =
      activities.filter(
        (activity) =>
          activity.date.startsWith(dateKey)
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
    (activeDays / numberOfDays) * 100
  );
};