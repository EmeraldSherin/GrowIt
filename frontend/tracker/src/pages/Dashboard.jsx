
import { useEffect, useState } from "react";

import {
  getActivities,
  updateActivity,
} from "../services/activityService";

import {
  getGoals,
  getGoalProgress,
} from "../services/goalService";

import { getToday } from "../utils/dateUtils";

import Calendar from "../components/Calender";
import DashboardStats from "../components/DashboardStats";
import Insights from "../components/Insights";

import "../components/Dashboard.css";

const formatDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goalProgress, setGoalProgress] = useState({});
  const [selectedDate, setSelectedDate] = useState(getToday());

  const [loading, setLoading] = useState(true);
  const [goalsLoading, setGoalsLoading] = useState(false);
  const [updatingActivity, setUpdatingActivity] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      try {
        const [activityData, goalData] = await Promise.all([
          getActivities(),
          getGoals(),
        ]);

        setActivities(activityData);
        setGoals(goalData);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadGoalProgress = async () => {
      const recurringGoals = goals.filter(
        (goal) => goal.type === "recurring"
      );

      if (recurringGoals.length === 0) {
        setGoalProgress({});
        return;
      }

      setGoalsLoading(true);

      const results = await Promise.all(
        recurringGoals.map(async (goal) => {
          try {
            const progress = await getGoalProgress(
              goal._id,
              selectedDate
            );

            return [goal._id, progress];
          } catch (error) {
            console.error(
              `Could not load progress for ${goal.title}:`,
              error
            );

            return [goal._id, null];
          }
        })
      );

      if (!cancelled) {
        setGoalProgress(Object.fromEntries(results));
        setGoalsLoading(false);
      }
    };

    loadGoalProgress();

    return () => {
      cancelled = true;
    };
  }, [goals, selectedDate]);

  const activitiesForSelectedDate = activities.filter(
    (activity) =>
      activity.date &&
      activity.date.startsWith(selectedDate)
  );

  const completedCount = activitiesForSelectedDate.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const completedMinutes = activitiesForSelectedDate
    .filter((activity) => activity.status === "Completed")
    .reduce(
      (total, activity) =>
        total + Number(activity.actualMinutes || 0),
      0
    );

  const handleCompleteActivity = async (activity) => {
    if (activity.status === "Completed") {
      return;
    }

    setUpdatingActivity(activity._id);

    try {
      const updatedActivity = await updateActivity(
        activity._id,
        { status: "Completed" }
      );

      setActivities((currentActivities) =>
        currentActivities.map((item) =>
          item._id === activity._id
            ? { ...item, ...updatedActivity }
            : item
        )
      );
    } catch (error) {
      console.error("Error completing activity:", error);
    } finally {
      setUpdatingActivity(null);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            Your daily growth
          </span>

          <h1>
            Good day <span aria-hidden="true">👋</span>
          </h1>

          <p>
            Plan your day, complete your activities, and
            build consistency one step at a time.
          </p>
        </div>
      </header>

      <section className="dashboard-section dashboard-calendar-section">
        <Calendar
          activities={activities}
          onDateSelect={setSelectedDate}
        />
      </section>

      <section className="dashboard-section today-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              Your daily tracker
            </span>

            <h2>{formatDate(selectedDate)}</h2>
          </div>

          <span className="section-meta">
            {completedCount} / {activitiesForSelectedDate.length} completed
          </span>
        </div>

        <div className="today-summary">
          <div className="today-summary__item">
            <span className="today-summary__label">
              Total activities
            </span>
            <strong>{activitiesForSelectedDate.length}</strong>
          </div>

          <div className="today-summary__item">
            <span className="today-summary__label">
              Completed
            </span>
            <strong>{completedCount}</strong>
          </div>

          <div className="today-summary__item">
            <span className="today-summary__label">
              Time recorded
            </span>
            <strong>{completedMinutes} min</strong>
          </div>
        </div>

        {loading ? (
          <p className="dashboard-message">
            Loading your activities...
          </p>
        ) : activitiesForSelectedDate.length === 0 ? (
          <div className="dashboard-message">
            <p>No activities planned for this date.</p>
            <p>
              Add an activity from the Activities page to
              start tracking your progress.
            </p>
          </div>
        ) : (
          <div className="today-activity-list">
            {activitiesForSelectedDate.map((activity) => (
              <article
                className="today-activity"
                key={activity._id}
              >
                <div className="today-activity__content">
                  <h3>{activity.title}</h3>

                  {activity.description && (
                    <p>{activity.description}</p>
                  )}

                  <div className="today-activity__meta">
                    <span>{activity.category}</span>
                    <span>
                      {Number(activity.actualMinutes || 0)} min
                    </span>
                    <span>{activity.status}</span>
                  </div>
                </div>

                {activity.status !== "Completed" && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={updatingActivity === activity._id}
                    onClick={() => handleCompleteActivity(activity)}
                  >
                    {updatingActivity === activity._id
                      ? "Saving..."
                      : "Mark complete"}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section daily-goals-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              Stay consistent
            </span>

            <h2>Recurring Goals</h2>
          </div>

          <span className="section-meta">
            {goals.filter((goal) => goal.type === "recurring").length} goals
          </span>
        </div>

        {goalsLoading && (
          <p className="dashboard-message">
            Updating goal progress...
          </p>
        )}

        {goals.filter((goal) => goal.type === "recurring").length === 0 ? (
          <div className="dashboard-message">
            <p>No recurring goals yet.</p>
            <p>
              Create a daily or weekly goal on the Goals page
              to track progress from completed activities.
            </p>
          </div>
        ) : (
          <div className="daily-goals-grid">
            {goals
              .filter((goal) => goal.type === "recurring")
              .map((goal) => {
                const progress = goalProgress[goal._id];
                const amount = progress?.progress ?? 0;
                const percentage = progress?.percentage ?? 0;
                const completed = progress?.completed ?? false;

                return (
                  <article className="goal-card" key={goal._id}>
                    <div className="goal-card__header">
                      <h3 className="goal-card__title">
                        {goal.title}
                      </h3>

                      <span
                        className={`goal-card__badge ${
                          completed
                            ? "goal-card__badge--completed"
                            : amount > 0
                              ? "goal-card__badge--in-progress"
                              : "goal-card__badge--not-started"
                        }`}
                      >
                        {completed
                          ? "Completed"
                          : amount > 0
                            ? "In Progress"
                            : "Not Started"}
                      </span>
                    </div>

                    <p className="daily-goal__details">
                      {goal.frequency === "weekly" ? "Weekly" : "Daily"}
                      {" · "}
                      {goal.unit === "minutes" ? "Minutes" : "Activities"}
                      {goal.category ? ` · ${goal.category}` : ""}
                    </p>

                    <div className="goal-card__meta">
                      <span className="goal-card__progress-text">
                        {amount} / {goal.target}
                        {goal.unit === "minutes" ? " min" : ""}
                      </span>

                      <span>{percentage}%</span>
                    </div>

                    <div
                      className="goal-card__progress-track"
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="goal-card__progress-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {progress === null && (
                      <p className="daily-goal__error">
                        Progress couldn't be loaded.
                      </p>
                    )}
                  </article>
                );
              })}
          </div>
        )}
      </section>

      <DashboardStats
        activities={activitiesForSelectedDate}
        selectedDate={selectedDate}
      />

      <Insights activities={activities} />
    </div>
  );
};

export default Dashboard;