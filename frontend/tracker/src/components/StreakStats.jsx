import { getStreakStats,getConsistencyRate } from "../utils/analiticsUtils";

const StreakStats = ({ activities }) => {

  const stats =
    getStreakStats(activities);

  const consistency7 =
    getConsistencyRate(
      activities,
      7
    );

  const consistency30 =
    getConsistencyRate(
      activities,
      30
    );

  return (
    <div>

      <h2>Consistency</h2>

      <p>
        🔥 Current Streak:{" "}
        {stats.currentStreak} days
      </p>

      <p>
        🏆 Longest Streak:{" "}
        {stats.longestStreak} days
      </p>

      <p>
        Active Days:{" "}
        {stats.activeDays}
      </p>

      <p>
        Last 7 Days:{" "}
        {consistency7}%
      </p>

      <p>
        Last 30 Days:{" "}
        {consistency30}%
      </p>

    </div>
  );
};

export default StreakStats;