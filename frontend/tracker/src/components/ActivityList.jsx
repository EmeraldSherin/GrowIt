import ActivityCard from './ActivityCard'

const ActivityList = ({activities,onEdit,onDelete}) => {
  return (
    <div>
      <h2>My Activities</h2>

      {activities.length === 0 ? (
        <p>No activities yet.</p>
      ) : (
        activities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}

export default ActivityList
