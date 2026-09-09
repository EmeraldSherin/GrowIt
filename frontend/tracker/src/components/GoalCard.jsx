const STATUS_CLASS = {
  "Not Started": "goal-card__badge--not-started",
  "In Progress": "goal-card__badge--in-progress",
  Completed: "goal-card__badge--completed",
};

const DeleteIcon = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
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

const getPercentage = (goal) =>
  goal.target === 0
    ? 0
    : Math.min(Math.round((goal.progress / goal.target) * 100), 100);

const GoalCard = ({ goal, onIncreaseProgress, onDelete }) => {
  const percentage = getPercentage(goal);
  const isComplete = goal.progress >= goal.target;

  return (
    <article className="goal-card">
      <header className="goal-card__header">
        <h3 className="goal-card__title">{goal.title}</h3>

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
          {goal.progress} / {goal.target}
        </span>

        <span
          className={`goal-card__badge ${STATUS_CLASS[goal.status] || ""}`}
        >
          {goal.status}
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
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="goal-card__percentage">{percentage}% complete</span>

      {!isComplete && (
        <button
          type="button"
          className="btn btn-secondary goal-card__progress-button"
          onClick={() => onIncreaseProgress(goal)}
        >
          +1 Progress
        </button>
      )}
    </article>
  );
};

export default GoalCard;
