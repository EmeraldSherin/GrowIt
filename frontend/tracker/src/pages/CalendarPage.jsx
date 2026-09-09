import { useEffect, useState } from "react";

import Calendar from "../components/Calender";
import DayActivities from "../components/DayActivities";
import { getActivities } from "../services/activityService";

import "../components/Dashboard.css";
import "../components/CalendarPage.css";

const CalendarPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const selectedActivities = selectedDate
    ? activities.filter(
        (activity) => activity.date && activity.date.startsWith(selectedDate)
      )
    : [];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">Stay on track</span>
          <h1>Calendar</h1>
          <p>View your activities by date.</p>
        </div>
      </header>

      <section className="dashboard-section dashboard-calendar-section">
        <Calendar activities={activities} onDateSelect={setSelectedDate} />
      </section>

      {selectedDate && (
        <DayActivities date={selectedDate} activities={selectedActivities} />
      )}
    </div>
  );
};

export default CalendarPage;
