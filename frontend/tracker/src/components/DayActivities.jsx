const STATUS_CLASS = {
  Pending: "day-activity-card__badge--pending",
  "In Progress": "day-activity-card__badge--in-progress",
  Completed: "day-activity-card__badge--completed",
};

const formatSelectedDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

const formatMinutes = (minutes) => {
  const value = Number(minutes || 0);

  if (value < 60) {
    return `${value} min`;
  }

  const hours = Math.floor(value / 60);
  const remainingMinutes = value % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
};

const DayActivities = ({ date, activities }) => {
  const completed = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const total = activities.length;

  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const plannedMinutes = activities.reduce(
    (totalMinutes, activity) =>
      totalMinutes + Number(activity.plannedMinutes || 0),
    0
  );

  const actualMinutes = activities.reduce(
    (totalMinutes, activity) =>
      totalMinutes + Number(activity.actualMinutes || 0),
    0
  );

  return (
    <section className="dashboard-section day-activities-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            Selected day
          </span>

          <h2>{formatSelectedDate(date)}</h2>
        </div>

        <span className="section-meta">
          {total} {total === 1 ? "activity" : "activities"}
        </span>
      </div>

      {total > 0 && (
        <div className="day-summary">
          <div className="day-summary__item">
            <span className="day-summary__value">
              {completed}/{total}
            </span>

            <span className="day-summary__label">
              Completed
            </span>
          </div>

          <div className="day-summary__item">
            <span className="day-summary__value">
              {completionRate}%
            </span>

            <span className="day-summary__label">
              Completion
            </span>
          </div>

          <div className="day-summary__item">
            <span className="day-summary__value">
              {formatMinutes(plannedMinutes)}
            </span>

            <span className="day-summary__label">
              Planned
            </span>
          </div>

          <div className="day-summary__item">
            <span className="day-summary__value">
              {formatMinutes(actualMinutes)}
            </span>

            <span className="day-summary__label">
              Actual
            </span>
          </div>
        </div>
      )}

      {total === 0 ? (
        <div className="day-activities__empty">
          <div className="day-activities__empty-icon">
            ○
          </div>

          <p>No activities planned for this day.</p>

          <span>
            Add an activity from the Activities page to start
            tracking this day.
          </span>
        </div>
      ) : (
        <div className="day-activities__grid">
          {activities.map((activity) => (
            <article
              className="day-activity-card"
              key={activity._id}
            >
              <div className="day-activity-card__header">
                <div>
                  <h3 className="day-activity-card__title">
                    {activity.title}
                  </h3>

                  {activity.description && (
                    <p className="day-activity-card__description">
                      {activity.description}
                    </p>
                  )}
                </div>

                <span
                  className={`day-activity-card__badge ${
                    STATUS_CLASS[activity.status] || ""
                  }`}
                >
                  {activity.status}
                </span>
              </div>

              <div className="day-activity-card__meta">
                <span className="day-activity-card__tag">
                  {activity.category || "Other"}
                </span>

                {activity.priority && (
                  <span className="day-activity-card__tag">
                    {activity.priority} priority
                  </span>
                )}
              </div>

              <div className="day-activity-card__time">
                <div>
                  <span>Planned</span>
                  <strong>
                    {formatMinutes(activity.plannedMinutes)}
                  </strong>
                </div>

                <div>
                  <span>Actual</span>
                  <strong>
                    {formatMinutes(activity.actualMinutes)}
                  </strong>
                </div>
              </div>

              {activity.notes && (
                <p className="day-activity-card__notes">
                  {activity.notes}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DayActivities;