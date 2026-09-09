const PRIORITY_CLASS = {
  Low: "activity-card__badge--priority-low",
  Medium: "activity-card__badge--priority-medium",
  High: "activity-card__badge--priority-high",
};

const STATUS_CLASS = {
  Pending: "activity-card__badge--status-pending",
  "In Progress": "activity-card__badge--status-progress",
  Completed: "activity-card__badge--status-completed",
};

const EditIcon = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path
      d="M12.6 3.4l4 4L6.5 17.5l-4.4.9.9-4.4L12.6 3.4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const ActivityCard = ({ activity, onEdit, onDelete }) => {
  const formattedDate = activity.date
    ? new Date(activity.date).toLocaleDateString()
    : "No date";

  return (
    <article className="activity-card">
      <header className="activity-card__header">
        <div className="activity-card__heading">
          <h3 className="activity-card__title">{activity.title}</h3>
          <span className="activity-card__date">{formattedDate}</span>
        </div>

        <div className="activity-card__actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => onEdit(activity)}
            aria-label={`Edit ${activity.title}`}
          >
            <EditIcon />
          </button>

          <button
            type="button"
            className="icon-button activity-card__delete"
            onClick={() => onDelete(activity._id)}
            aria-label={`Delete ${activity.title}`}
          >
            <DeleteIcon />
          </button>
        </div>
      </header>

      <div className="activity-card__meta">
        <span className="activity-card__tag">{activity.category}</span>

        <span
          className={`activity-card__badge ${
            PRIORITY_CLASS[activity.priority] || ""
          }`}
        >
          {activity.priority} priority
        </span>

        <span
          className={`activity-card__badge ${
            STATUS_CLASS[activity.status] || ""
          }`}
        >
          {activity.status}
        </span>
      </div>

      {activity.description && (
        <p className="activity-card__description">{activity.description}</p>
      )}

      <div className="activity-card__time">
        <div className="activity-card__time-item">
          <span className="activity-card__time-label">Planned</span>
          <strong>{activity.plannedMinutes} min</strong>
        </div>

        <div className="activity-card__time-item">
          <span className="activity-card__time-label">Actual</span>
          <strong>{activity.actualMinutes} min</strong>
        </div>
      </div>

      {activity.notes && (
        <p className="activity-card__notes">
          <strong>Notes: </strong>
          {activity.notes}
        </p>
      )}
    </article>
  );
};

export default ActivityCard;