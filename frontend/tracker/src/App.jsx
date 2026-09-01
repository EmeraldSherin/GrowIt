import { useEffect, useState } from "react";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import DashboardStats from "./components/DashboardStats";
import { getToday } from "./utils/dateUtils";
import Calendar from "./components/Calender";
import HeatMap from "./components/HeatMap";
import WeeklyStats from "./components/WeeklyStats";
import StreakStats from "./components/StreakStats";
import Insights from "./components/Insights";

function App() {

  const [activities, setActivities] = useState([]);

  const [editingActivity,setEditingActivity]=useState(null)

  const [selectedDate, setSelectedDate] = useState(
    getToday()
  );

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/activities"
      );

      const data = await response.json();

      setActivities(data);

    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

 const handleActivityAdded = (activity) => {
  setActivities((currentActivities) => {

    const exists = currentActivities.some(
      (item) => item._id === activity._id
    );

    if (exists) {
      return currentActivities.map((item) =>
        item._id === activity._id
          ? activity
          : item
      );
    }

    return [
      ...currentActivities,
      activity
    ];
  });
};

  const filteredActivities = activities.filter(
    (activity) => {
      return activity.date.startsWith(selectedDate);
    }
  );

  const handleEdit=(activity)=>{
    setEditingActivity(activity)
  }
  const handleDelete = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/activities/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete activity");
    }

    setActivities(
      activities.filter(
        (activity) => activity._id !== id
      )
    );

  } catch (error) {
    console.error("Error deleting activity:", error);
  }
};

  return (
    <div>

      <h1>GrowIt</h1>

      <Calendar
      activities={activities}
      onDateSelect={setSelectedDate}
    />

      <DashboardStats
        activities={filteredActivities}
        selectedDate={selectedDate}
      />

      <WeeklyStats
      activities={activities}
      />
      <StreakStats
      activities={activities}
      />

      <Insights
      activities={activities}
      />

      <HeatMap
      activities={activities}
      />
      
      <ActivityForm
        onActivityAdded={handleActivityAdded}
        editingActivity={editingActivity}
        setEditingActivity={setEditingActivity}
      />

      <ActivityList
        activities={filteredActivities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default App;