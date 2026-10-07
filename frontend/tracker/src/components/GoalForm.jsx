import { useState } from "react";

import { createGoal } from "../services/goalService";

const GoalForm = ({ onGoalCreated }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [type, setType] = useState("long-term");
  const [frequency, setFrequency] = useState("daily");
  const [unit, setUnit] = useState("minutes");
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setTitle("");
    setTarget("");
    setType("long-term");
    setFrequency("daily");
    setUnit("minutes");
    setCategory("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !target) {
      return;
    }

    try {
      const goalData = {
        title: title.trim(),
        target: Number(target),
        type,
        progress: 0,
        status: "Not Started",
      };

      if (type === "recurring") {
        goalData.frequency = frequency;
        goalData.unit = unit;

        if (category) {
          goalData.category = category;
        }
      }

      const newGoal = await createGoal(goalData);

      onGoalCreated(newGoal);
      resetForm();
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
            placeholder="e.g. Study"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="field goal-form__field">
          <label htmlFor="goal-type">Goal type</label>
          <select
            id="goal-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="long-term">Long-term</option>
            <option value="recurring">Daily / Recurring</option>
          </select>
        </div>

        <div className="field goal-form__field goal-form__field--target">
          <label htmlFor="goal-target">
            Target
          </label>

          <input
            id="goal-target"
            type="number"
            min="1"
            placeholder="e.g. 60"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            required
          />
        </div>

        {type === "recurring" && (
          <>
            <div className="field goal-form__field">
              <label htmlFor="goal-frequency">Frequency</label>

              <select
                id="goal-frequency"
                value={frequency}
                onChange={(event) =>
                  setFrequency(event.target.value)
                }
              >
                <option value="daily">Every day</option>
                <option value="weekly">Every week</option>
              </select>
            </div>

            <div className="field goal-form__field">
              <label htmlFor="goal-unit">Track by</label>

              <select
                id="goal-unit"
                value={unit}
                onChange={(event) =>
                  setUnit(event.target.value)
                }
              >
                <option value="minutes">Minutes</option>
                <option value="activities">Activities</option>
              </select>
            </div>

            <div className="field goal-form__field">
              <label htmlFor="goal-category">
                Activity category
              </label>

              <select
                id="goal-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                <option value="">All categories</option>
                <option value="Study">Study</option>
                <option value="Coding">Coding</option>
                <option value="Work">Work</option>
                <option value="Exercise">Exercise</option>
                <option value="Personal">Personal</option>
                <option value="Project">Project</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn-primary goal-form__submit"
        >
          Add Goal
        </button>
      </form>
    </section>
  );
};

export default GoalForm;