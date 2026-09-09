import { getWeeklyStats } from "../utils/analiticsUtils";

const WeeklyStats = ({ activities }) => {
  const stats = getWeeklyStats(activities);

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Weekly review</span>
          <h2>Last 7 Days</h2>
        </div>

        <span className="section-meta">Weekly performance</span>
      </div>

      <div className="stats-grid weekly-stats-grid">
        <div className="stat-card">
          <span className="stat-card__label">Total Activities</span>
          <strong className="stat-card__value">
            {stats.totalActivities}
          </strong>
        </div>

        <div className="stat-card stat-card--success">
          <span className="stat-card__label">Completed</span>
          <strong className="stat-card__value">
            {stats.completedActivities}
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Completion Rate</span>
          <strong className="stat-card__value">
            {stats.completionRate}%
          </strong>
        </div>

        <div className="stat-card stat-card--primary">
          <span className="stat-card__label">Average Daily Completion</span>
          <strong className="stat-card__value">
            {stats.averageDailyCompletion}%
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Planned Time</span>
          <strong className="stat-card__value stat-card__value--small">
            {stats.plannedMinutes}
            <small> min</small>
          </strong>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Actual Time</span>
          <strong className="stat-card__value stat-card__value--small">
            {stats.actualMinutes}
            <small> min</small>
          </strong>
        </div>
      </div>
    </section>
  );
};

export default WeeklyStats;