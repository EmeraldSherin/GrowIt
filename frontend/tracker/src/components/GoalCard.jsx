import { useEffect, useState } from "react";

import { getGoalProgress } from "../services/goalService";
import { getToday } from "../utils/dateUtils";

const STATUS_CLASS = {
  "Not Started": "goal-card__badge--not-started",
  "In Progress": "goal-card__badge--in-progress",
  Completed: "goal-card__badge--completed",
};

const DeleteIcon = () => (
  <svg
    viewBox="0 0 20 20"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      d="M4 6h12M8 6V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m-6.5 0l.6 10.2A1.5 1.5 0 007.6 17.6h4.8a1.5 1.5 0 001.5-1.4L14.5 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getPercentage = (progress, target) =>
  target === 0
    ? 0
    : Math.min(
        Math.round((progress / target) * 100),
        100
      );

const GoalCard = ({ goal, onIncreaseProgress, onDelete }) => {
  const isRecurring = goal.type === "recurring";

  const [recurringProgress, setRecurringProgress] =
    useState(null);

  const [loadingProgress, setLoadingProgress] =
    useState(false);

  useEffect(() => {
    if (!isRecurring) {
      return;
    }

    const loadProgress = async () => {
      try {
        setLoadingProgress(true);

        const data = await getGoalProgress(
          goal._id,
          getToday()
        );

        setRecurringProgress(data);
      } catch (error) {
        console.error(
          "Error fetching recurring goal progress:",
          error
        );
      } finally {
        setLoadingProgress(false);
      }
    };

    loadProgress();
  }, [goal._id, isRecurring]);

  const progress = isRecurring
    ? recurringProgress?.progress || 0
    : goal.progress || 0;

  const percentage = isRecurring
    ? recurringProgress?.percentage || 0
    : getPercentage(progress, goal.target);

  const isComplete = isRecurring
    ? recurringProgress?.completed
    : progress >= goal.target;

  const status = isRecurring
    ? isComplete
      ? "Completed"
      : progress > 0
        ? "In Progress"
        : "Not Started"
    : goal.status;

  const unitLabel =
    goal.unit === "minutes"
      ? "min"
      : "activities";

  return (
    <article className="goal-card">
      <header className="goal-card__header">
        <div>
          <h3 className="goal-card__title">
            {goal.title}
          </h3>

          {isRecurring && (
            <span className="goal-card__type">
              {goal.frequency === "weekly"
                ? "Weekly"
                : "Daily"}{" "}
              ·{" "}
              {goal.unit === "minutes"
                ? "Minutes"
                : "Activities"}
            </span>
          )}
        </div>

        <button
          type="button"
          className="icon-button goal-card__delete"
          onClick={() => onDelete(goal._id)}
          aria-label={`Delete ${goal.title}`}
        >
          <DeleteIcon />
        </button>
      </header>

      <div className="goal-card__meta">
        <span className="goal-card__progress-text">
          {loadingProgress ? (
            "Loading..."
          ) : (
            <>
              {progress} / {goal.target}{" "}
              {isRecurring && unitLabel}
            </>
          )}
        </span>

        <span
          className={`goal-card__badge ${
            STATUS_CLASS[status] || ""
          }`}
        >
          {status}
        </span>
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
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <span className="goal-card__percentage">
        {percentage}% complete
      </span>

      {isRecurring && (
        <span className="goal-card__recurring-info">
          {goal.category
            ? `Based on ${goal.category} activities`
            : "Based on completed activities"}
        </span>
      )}

      {!isRecurring && !isComplete && (
        <button
          type="button"
          className="btn btn-secondary goal-card__progress-button"
          onClick={() =>
            onIncreaseProgress(goal)
          }
        >
          +1 Progress
        </button>
      )}

      {isRecurring && isComplete && (
        <span className="goal-card__recurring-complete">
          {goal.frequency === "weekly"
  ? "✓ Goal completed this week"
  : "✓ Goal completed today"}
        </span>
      )}
    </article>
  );
};

export default GoalCard;