import { useEffect, useState } from "react";

import { getActivities, deleteActivity } from "../services/activityService";

import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

import "../components/Dashboard.css";
import "../components/Activities.css";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // Add / update an activity in local state after a successful save
  const handleActivityAdded = (activity) => {
    setActivities((currentActivities) => {
      const exists = currentActivities.some(
        (item) => item._id === activity._id
      );

      if (exists) {
        return currentActivities.map((item) =>
          item._id === activity._id ? activity : item
        );
      }

      return [...currentActivities, activity];
    });
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id);
      setActivities((currentActivities) =>
        currentActivities.filter((activity) => activity._id !== id)
      );
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">Plan &amp; track</span>
          <h1>Activities</h1>
          <p>Create and manage your daily activities.</p>
        </div>
      </header>

      <ActivityForm
        onActivityAdded={handleActivityAdded}
        editingActivity={editingActivity}
        setEditingActivity={setEditingActivity}
      />

      <ActivityList
        activities={activities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Activities;