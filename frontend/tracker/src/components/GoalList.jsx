import GoalCard from "./GoalCard";

const GoalList = ({ goals, onIncreaseProgress, onDelete }) => {
  return (
    <section className="dashboard-section goal-list-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Your goals</span>
          <h2>Your Goals</h2>
        </div>

        <span className="section-meta">
          {goals.length} {goals.length === 1 ? "goal" : "goals"}
        </span>
      </div>

      {goals.length === 0 ? (
        <div className="goal-list__empty">
          <p>No goals created yet. Add one above to start tracking progress.</p>
        </div>
      ) : (
        <div className="goal-grid">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onIncreaseProgress={onIncreaseProgress}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default GoalList;
