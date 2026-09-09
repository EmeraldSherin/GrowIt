import ActivityCard from "./ActivityCard";

const ActivityList = ({ activities, onEdit, onDelete }) => {
  return (
    <section className="dashboard-section activity-list-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Your activities</span>
          <h2>Activity List</h2>
        </div>

        <span className="section-meta">
          {activities.length} {activities.length === 1 ? "activity" : "activities"}
        </span>
      </div>

      {activities.length === 0 ? (
        <div className="activity-list__empty">
          <p>No activities yet. Add your first one above to start tracking.</p>
        </div>
      ) : (
        <div className="activity-grid">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivityList;