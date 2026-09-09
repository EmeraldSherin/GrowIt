import { useState } from "react";

import { createGoal } from "../services/goalService";

const GoalForm = ({ onGoalCreated }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !target) {
      return;
    }

    try {
      const newGoal = await createGoal({
        title: title.trim(),
        target: Number(target),
        progress: 0,
        status: "Not Started",
      });

      onGoalCreated(newGoal);
      setTitle("");
      setTarget("");
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <section className="dashboard-section goal-form-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Plan</span>
          <h2>Create Goal</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="goal-form">
        <div className="field goal-form__field">
          <label htmlFor="goal-title">Goal title</label>
          <input
            id="goal-title"
            type="text"
            placeholder="e.g. Read 12 books this year"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="field goal-form__field goal-form__field--target">
          <label htmlFor="goal-target">Target</label>
          <input
            id="goal-target"
            type="number"
            min="1"
            placeholder="e.g. 12"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary goal-form__submit">
          Add Goal
        </button>
      </form>
    </section>
  );
};

export default GoalForm;
