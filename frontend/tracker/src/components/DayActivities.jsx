const STATUS_CLASS = {
  Pending: "day-activity-card__badge--pending",
  "In Progress": "day-activity-card__badge--in-progress",
  Completed: "day-activity-card__badge--completed",
};

const formatSelectedDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const DayActivities = ({ date, activities }) => {
  return (
    <section className="dashboard-section day-activities-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Selected day</span>
          <h2>Activities for {formatSelectedDate(date)}</h2>
        </div>

        <span className="section-meta">
          {activities.length}{" "}
          {activities.length === 1 ? "activity" : "activities"}
        </span>
      </div>

      {activities.length === 0 ? (
        <div className="day-activities__empty">
          <p>No activities planned for this day.</p>
        </div>
      ) : (
        <div className="day-activities__grid">
          {activities.map((activity) => (
            <div className="day-activity-card" key={activity._id}>
              <h3 className="day-activity-card__title">{activity.title}</h3>

              <div className="day-activity-card__meta">
                <span className="day-activity-card__tag">
                  {activity.category || "Other"}
                </span>

                <span
                  className={`day-activity-card__badge ${
                    STATUS_CLASS[activity.status] || ""
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DayActivities;
