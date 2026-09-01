import {
  getDailyStats,
  getDailyPerformanceScore,
  getLast7Days
} from "./analiticsUtils";

export const generateInsights = (activities) => {

  const insights = [];

  // --------------------------------
  // 1. COMPLETION INSIGHT
  // --------------------------------

  const days = getLast7Days();

  const dailyScores = days.map((date) =>
    getDailyPerformanceScore(
      activities,
      date
    )
  );

  const activeScores =
    dailyScores.filter(
      (score) => score > 0
    );

  if (activeScores.length > 0) {

    const averageScore =
      Math.round(
        activeScores.reduce(
          (sum, score) => sum + score,
          0
        ) / activeScores.length
      );

    insights.push({
      type: "performance",
      title: "Weekly Performance",
      message:
        `Your average performance score over active days is ${averageScore}/100.`
    });
  }

  // --------------------------------
  // 2. PLANNING ACCURACY
  // --------------------------------

  let totalPlanned = 0;
  let totalActual = 0;

  activities.forEach((activity) => {

    totalPlanned += Number(
      activity.plannedMinutes || 0
    );

    totalActual += Number(
      activity.actualMinutes || 0
    );
  });

  if (totalPlanned > 0) {

    const difference =
      totalActual - totalPlanned;

    const percentage =
      Math.round(
        Math.abs(difference) /
        totalPlanned *
        100
      );

    if (difference > 0) {

      insights.push({
        type: "time",
        title: "Planning Accuracy",
        message:
          `You spent about ${percentage}% more time than planned.`
      });

    } else if (difference < 0) {

      insights.push({
        type: "time",
        title: "Planning Accuracy",
        message:
          `You completed your activities about ${percentage}% faster than planned.`
      });

    } else {

      insights.push({
        type: "time",
        title: "Planning Accuracy",
        message:
          "Your planned and actual time are currently very close."
      });
    }
  }

  // --------------------------------
  // 3. STRONGEST CATEGORY
  // --------------------------------

  const categories = {};

  activities.forEach((activity) => {

    const category =
      activity.category || "Other";

    if (!categories[category]) {
      categories[category] = {
        total: 0,
        completed: 0
      };
    }

    categories[category].total++;

    if (
      activity.status === "Completed"
    ) {
      categories[category].completed++;
    }
  });

  let bestCategory = null;
  let bestRate = 0;

  Object.keys(categories).forEach(
    (category) => {

      const data =
        categories[category];

      if (data.total === 0) {
        return;
      }

      const rate =
        Math.round(
          (data.completed /
            data.total) *
            100
        );

      if (rate > bestRate) {
        bestRate = rate;
        bestCategory = category;
      }
    }
  );

  if (bestCategory) {

    insights.push({
      type: "category",
      title: "Strongest Category",
      message:
        `${bestCategory} is currently your strongest category with a ${bestRate}% completion rate.`
    });
  }

  return insights;
};