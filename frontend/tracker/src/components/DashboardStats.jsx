import { getDailyPerformanceScore } from "../utils/analiticsUtils";
const DashboardStats = ({activities,selectedDate}) => {
  
  const totalActivities = activities.length;

  const completedActivities =
    activities.filter(
      (activity) =>
        activity.status === "Completed"
    ).length;

  const pendingActivities =
    activities.filter(
      (activity) =>
        activity.status === "Pending"
    ).length;

  const completionRate =
    totalActivities === 0
      ? 0
      : Math.round(
          (completedActivities /
            totalActivities) *
            100
        );

  const plannedMinutes =
    activities.reduce(
      (total, activity) =>
        total +
        Number(activity.plannedMinutes || 0),
      0
    );

  const actualMinutes =
    activities.reduce(
      (total, activity) =>
        total +
        Number(activity.actualMinutes || 0),
      0
    );
    const performanceScore =
  getDailyPerformanceScore(
    activities,
    selectedDate
  );
  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total: {totalActivities}</p>

      <p>
        Completed: {completedActivities}
      </p>

      <p>
        Pending: {pendingActivities}
      </p>

      <p>
        Completion Rate: {completionRate}%
      </p>

      <p>
        Planned: {plannedMinutes} minutes
      </p>

      <p>
        Actual: {actualMinutes} minutes
      </p>
      <p>
        Daily Performance:{" "}
      {performanceScore}/100
      </p>
    </div>
  )
}

export default DashboardStats
