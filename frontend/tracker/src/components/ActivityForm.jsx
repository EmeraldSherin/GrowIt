import { useEffect,useState } from "react";
const ActivityForm = ({onActivityAdded,editingActivity,setEditingActivity}) => {
    const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "Coding",
  date: "",
  priority: "Medium",
  plannedMinutes: 0,
  actualMinutes: 0,
  status: "Pending",
  notes: ""
});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
  if (editingActivity) {
    setFormData({
      title: editingActivity.title,
      description: editingActivity.description || "",
      category: editingActivity.category,
      date: editingActivity.date.split("T")[0],
      priority: editingActivity.priority,
      plannedMinutes: editingActivity.plannedMinutes,
      actualMinutes: editingActivity.actualMinutes,
      status: editingActivity.status,
      notes: editingActivity.notes || ""
    });
  }
}, [editingActivity]);

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const url = editingActivity
      ? `http://localhost:5000/api/activities/${editingActivity._id}`
      : "http://localhost:5000/api/activities";

    const method = editingActivity
      ? "PUT"
      : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    onActivityAdded(data);
    setEditingActivity(null);

    setFormData({
      title: "",
      description: "",
      category: "Coding",
      date: "",
      priority: "Medium",
      plannedMinutes: 0,
      actualMinutes: 0,
      status: "Pending",
      notes: ""
    });

  } catch (error) {
    console.error("Error saving activity:", error);
  }
};

  return (
    <form onSubmit={handleSubmit}>

      <h2>
  {editingActivity ? "Edit Activity" : "Add Activity"}
</h2>

      <div>
        <label>Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Description</label>

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <br />

      <div>
        <label>Category</label>

        <select
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

      <br />

      <div>
        <label>Date</label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Priority</label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <br />

      <div>
        <label>Planned Minutes</label>

        <input
          type="number"
          name="plannedMinutes"
          value={formData.plannedMinutes}
          onChange={handleChange}
          min="0"
        />
      </div>

      <br />

      <div>
        <label>Actual Minutes</label>

        <input
          type="number"
          name="actualMinutes"
          value={formData.actualMinutes}
          onChange={handleChange}
          min="0"
        />
      </div>

      <br />

      <div>
        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <br />

      <div>
        <label>Notes</label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <br />

      <button type="submit">
  {editingActivity ? "Update Activity" : "Add Activity"}
</button>
 {editingActivity && (
  <button
    type="button"
    onClick={() => {
      setEditingActivity(null);

      setFormData({
        title: "",
        description: "",
        category: "Coding",
        date: "",
        priority: "Medium",
        plannedMinutes: 0,
        actualMinutes: 0,
        status: "Pending",
        notes: ""
      });
    }}
  >
    Cancel
  </button>
)}

    </form>
  )
}

export default ActivityForm
