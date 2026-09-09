import {
  get30DayStats,
  getWeeklyStats,
  getCategoryStats,
  getStreakStats,
} from "../utils/analiticsUtils";

// Each builder returns an insight object or null if its condition isn't met.
// Keeping them as small, isolated functions makes the rules easy to scan,
// test, and extend without touching the others.

const buildCompletionInsight = (monthly) => {
  if (monthly.completionRate >= 80) {
    return {
      type: "positive",
      title: "Excellent completion",
      message: `You completed ${monthly.completionRate}% of your activities over the last 30 days.`,
    };
  }

  if (monthly.completionRate >= 60) {
    return {
      type: "positive",
      title: "Good progress",
      message: `Your 30-day completion rate is ${monthly.completionRate}%.`,
    };
  }

  if (monthly.totalActivities > 0) {
    return {
      type: "warning",
      title: "Completion needs attention",
      message: `You completed ${monthly.completionRate}% of your activities. Try reducing the number of activities you plan each day.`,
    };
  }

  return null;
};

const buildConsistencyInsight = (monthly) => {
  if (monthly.activeDays >= 25) {
    return {
      type: "positive",
      title: "Very consistent",
      message: `You were active on ${monthly.activeDays} of the last 30 days.`,
    };
  }

  if (monthly.activeDays >= 15) {
    return {
      type: "neutral",
      title: "Building consistency",
      message: `You were active on ${monthly.activeDays} of the last 30 days.`,
    };
  }

  if (monthly.totalActivities > 0) {
    return {
      type: "warning",
      title: "Consistency opportunity",
      message: `You were active on only ${monthly.activeDays} of the last 30 days. Focus on showing up regularly.`,
    };
  }

  return null;
};

const buildPerformanceInsight = (monthly) => {
  if (monthly.averageDailyScore >= 80) {
    return {
      type: "positive",
      title: "Strong performance",
      message: `Your average daily performance score is ${monthly.averageDailyScore}/100.`,
    };
  }

  if (monthly.averageDailyScore < 50 && monthly.totalActivities > 0) {
    return {
      type: "warning",
      title: "Performance opportunity",
      message: `Your average performance score is ${monthly.averageDailyScore}/100. Consider planning fewer activities and completing them consistently.`,
    };
  }

  return null;
};

const buildTimeManagementInsight = (monthly) => {
  if (monthly.plannedMinutes <= 0 || monthly.actualMinutes <= 0) {
    return null;
  }

  const difference = monthly.actualMinutes - monthly.plannedMinutes;

  if (difference > 60) {
    return {
      type: "warning",
      title: "Planning takes longer than expected",
      message: `You spent ${difference} more minutes than planned over the last 30 days.`,
    };
  }

  if (Math.abs(difference) <= 30) {
    return {
      type: "positive",
      title: "Good time estimation",
      message: "Your planned and actual time are closely aligned.",
    };
  }

  return null;
};

const buildCategoryInsight = (categories) => {
  if (categories.length === 0) {
    return null;
  }

  const bestCategory = [...categories].sort(
    (a, b) => b.completionRate - a.completionRate
  )[0];

  if (bestCategory.total < 2) {
    return null;
  }

  return {
    type: "positive",
    title: "Strongest category",
    message: `${bestCategory.category} is your strongest category with a ${bestCategory.completionRate}% completion rate.`,
  };
};

const buildStreakInsight = (streak) => {
  if (streak.currentStreak >= 7) {
    return {
      type: "positive",
      title: "Great streak",
      message: `You're currently on a ${streak.currentStreak}-day consistency streak.`,
    };
  }

  if (streak.currentStreak > 0) {
    return {
      type: "neutral",
      title: "Keep the streak going",
      message: `Your current consistency streak is ${streak.currentStreak} day${
        streak.currentStreak === 1 ? "" : "s"
      }.`,
    };
  }

  return null;
};

const buildWeeklyInsight = (weekly) => {
  if (weekly.completionRate >= 80) {
    return {
      type: "positive",
      title: "Strong week",
      message: `You completed ${weekly.completionRate}% of your activities this week.`,
    };
  }

  return null;
};

const NO_DATA_INSIGHT = {
  type: "neutral",
  title: "Start tracking",
  message: "Add a few activities to start generating personalized insights.",
};

const buildInsights = (activities) => {
  const monthly = get30DayStats(activities);
  const weekly = getWeeklyStats(activities);
  const categories = getCategoryStats(activities);
  const streak = getStreakStats(activities);

  const insights = [
    buildCompletionInsight(monthly),
    buildConsistencyInsight(monthly),
    buildPerformanceInsight(monthly),
    buildTimeManagementInsight(monthly),
    buildCategoryInsight(categories),
    buildStreakInsight(streak),
    buildWeeklyInsight(weekly),
  ].filter(Boolean);

  return insights.length > 0 ? insights : [NO_DATA_INSIGHT];
};

const Insights = ({ activities }) => {
  const insights = buildInsights(activities);

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Personalized</span>
          <h2>Insights</h2>
        </div>

        <span className="section-meta">Based on your activity</span>
      </div>

      <div className="insights-container">
        {insights.map((insight, index) => (
          <div className={`insight-card ${insight.type}`} key={index}>
            <div className="insight-card__indicator" />

            <div>
              <h3>{insight.title}</h3>
              <p>{insight.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insights;