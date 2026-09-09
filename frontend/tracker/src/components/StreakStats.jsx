import { getStreakStats, getConsistencyRate } from "../utils/analiticsUtils";

const StreakStats = ({ activities }) => {
  const stats = getStreakStats(activities);
  const consistency7 = getConsistencyRate(activities, 7);
  const consistency30 = getConsistencyRate(activities, 30);

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Consistency</span>
          <h2>Streaks</h2>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--primary">
          <span className="stat-card__label">Current Streak</span>
          <strong className="stat-card__value">
            {stats.currentStreak}
            <small> days</small>
          </strong>
          <span className="stat-card__hint">🔥 Keep it going</span>
        </div>

        <div className="stat-card stat-card--success">
          <span className="stat-card__label">Longest Streak</span>
          <strong className="stat-card__value">
            {stats.longestStreak}
            <small> days</small>
          </strong>
          <span className="stat-card__hint">🏆 Personal best</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Active Days</span>
          <strong className="stat-card__value">{stats.activeDays}</strong>
          <span className="stat-card__hint">Last 365 days</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Last 7 Days</span>
          <strong className="stat-card__value">{consistency7}%</strong>
          <span className="stat-card__hint">Consistency</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__label">Last 30 Days</span>
          <strong className="stat-card__value">{consistency30}%</strong>
          <span className="stat-card__hint">Consistency</span>
        </div>
      </div>
    </section>
  );
};

export default StreakStats;