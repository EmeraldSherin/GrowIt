import { getDailyPerformanceScore } from "../utils/analiticsUtils";

const DashboardStats = ({ activities, selectedDate }) => {
  const totalActivities = activities.length;

  const completedActivities = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const pendingActivities = activities.filter(
    (activity) => activity.status === "Pending"
  ).length;

  const completionRate =
    totalActivities === 0
      ? 0
      : Math.round((completedActivities / totalActivities) * 100);

  const plannedMinutes = activities.reduce(
    (total, activity) => total + Number(activity.plannedMinutes || 0),
    0
  );

  const actualMinutes = activities.reduce(
    (total, activity) => total + Number(activity.actualMinutes || 0),
    0
  );

  const performanceScore = getDailyPerformanceScore(activities, selectedDate);

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Today</span>
          <h2>Today's Overview</h2>
        </div>

        <span className="section-date">{selectedDate}</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--primary">
          <span className="stat-card__label">Total Activities</span>
          <strong className="stat-card__value">{totalActivities}</strong>
          <span className="stat-card__hint">Planned today</span>
        </div>

        <div className="stat-card stat-card--success">
          <span className="stat-card__label">Completed</span>
          <strong className="stat-card__value">{completedActivities}</strong>
          <span className="stat-card__hint">Finished today</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Pending</span>
          <strong className="stat-card__value">{pendingActivities}</strong>
          <span className="stat-card__hint">Still remaining</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Completion Rate</span>
          <strong className="stat-card__value">{completionRate}%</strong>
          <span className="stat-card__hint">Today's progress</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Planned Time</span>
          <strong className="stat-card__value stat-card__value--small">
            {plannedMinutes}
            <small> min</small>
          </strong>
          <span className="stat-card__hint">Time planned</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Actual Time</span>
          <strong className="stat-card__value stat-card__value--small">
            {actualMinutes}
            <small> min</small>
          </strong>
          <span className="stat-card__hint">Time spent</span>
        </div>

        <div className="stat-card stat-card--score">
          <span className="stat-card__label">Performance Score</span>
          <strong className="stat-card__value">
            {performanceScore}
            <small>/100</small>
          </strong>
          <span className="stat-card__hint">Daily performance</span>
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;