
const ActivityCard = ({activity,onEdit,onDelete}) => {
  return (
    <div>
      <h3>{activity.title}</h3>

      <p>Category: {activity.category}</p>

      <p>Date: {activity.date}</p>

      <p>Priority: {activity.priority}</p>

      <p>Status: {activity.status}</p>

      <p>
        Planned: {activity.plannedMinutes} minutes
      </p>

      <p>
        Actual: {activity.actualMinutes} minutes
      </p>
      <button onClick={() => onEdit(activity)}>
        Edit
      </button>

      <button onClick={() => onDelete(activity._id)}>
        Delete
      </button>

      <hr />
    </div>
  )
}

export default ActivityCard