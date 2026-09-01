import { getWeeklyStats } from "../utils/analiticsUtils"
const WeeklyStats = ({activities}) => {
    const stats=getWeeklyStats(activities);
  return (
    <div>
      <h2>Last 7 Days</h2>

      <p>
        Total Activities:{" "}
        {stats.totalActivities}
      </p>

      <p>
        Completed:{" "}
        {stats.completedActivities}
      </p>

      <p>
        Completion Rate:{" "}
        {stats.completionRate}%
      </p>

      <p>
        Average Daily Completion:{" "}
        {stats.averageDailyCompletion}%
      </p>

      <p>
        Planned Time:{" "}
        {stats.plannedMinutes} minutes
      </p>

      <p>
        Actual Time:{" "}
        {stats.actualMinutes} minutes
      </p>
    </div>
  )
}

export default WeeklyStats
