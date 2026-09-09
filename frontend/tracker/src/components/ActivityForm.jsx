import { useEffect, useState } from "react";

import { createActivity, updateActivity } from "../services/activityService";

const initialFormData = {
  title: "",
  description: "",
  category: "Coding",
  date: "",
  priority: "Medium",
  plannedMinutes: 0,
  actualMinutes: 0,
  status: "Pending",
  notes: "",
};

const ActivityForm = ({
  onActivityAdded,
  editingActivity,
  setEditingActivity,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // Load activity data into the form when an edit is requested
  useEffect(() => {
    if (!editingActivity) {
      return;
    }

    setFormData({
      title: editingActivity.title || "",
      description: editingActivity.description || "",
      category: editingActivity.category || "Coding",
      date: editingActivity.date
        ? new Date(editingActivity.date).toISOString().split("T")[0]
        : "",
      priority: editingActivity.priority || "Medium",
      plannedMinutes: editingActivity.plannedMinutes || 0,
      actualMinutes: editingActivity.actualMinutes || 0,
      status: editingActivity.status || "Pending",
      notes: editingActivity.notes || "",
    });
  }, [editingActivity]);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingActivity(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = editingActivity
        ? await updateActivity(editingActivity._id, formData)
        : await createActivity(formData);

      onActivityAdded(data);
      resetForm();
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  return (
    <section className="dashboard-section activity-form-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Plan</span>
          <h2>{editingActivity ? "Edit Activity" : "Add Activity"}</h2>
        </div>

        {editingActivity && (
          <span className="section-meta">Editing</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="activity-form">
        <div className="field activity-form__field--full">
          <label htmlFor="activity-title">Title</label>
          <input
            id="activity-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What are you working on?"
            required
          />
        </div>

        <div className="field activity-form__field--full">
          <label htmlFor="activity-description">Description</label>
          <input
            id="activity-description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional short summary"
          />
        </div>

        <div className="activity-form__grid">
          <div className="field">
            <label htmlFor="activity-category">Category</label>
            <select
              id="activity-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Study">Study</option>
              <option value="Coding">Coding</option>
              <option value="Work">Work</option>
              <option value="Exercise">Exercise</option>
              <option value="Personal">Personal</option>
              <option value="Project">Project</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="activity-priority">Priority</label>
            <select
              id="activity-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="activity-date">Date</label>
            <input
              id="activity-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="activity-status">Status</label>
            <select
              id="activity-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="activity-planned">Planned Minutes</label>
            <input
              id="activity-planned"
              type="number"
              name="plannedMinutes"
              value={formData.plannedMinutes}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="field">
            <label htmlFor="activity-actual">Actual Minutes</label>
            <input
              id="activity-actual"
              type="number"
              name="actualMinutes"
              value={formData.actualMinutes}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="field activity-form__field--full">
          <label htmlFor="activity-notes">Notes</label>
          <textarea
            id="activity-notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Anything worth remembering about this activity"
          />
        </div>

        <div className="activity-form__actions">
          <button type="submit" className="btn btn-primary">
            {editingActivity ? "Update Activity" : "Add Activity"}
          </button>

          {editingActivity && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ActivityForm;