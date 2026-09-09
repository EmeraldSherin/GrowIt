import { useEffect, useState } from "react";

import { getActivities } from "../services/activityService";
import { getToday } from "../utils/dateUtils";

import Calendar from "../components/Calender";
import DashboardStats from "../components/DashboardStats";
import WeeklyStats from "../components/WeeklyStats";
import PerformanceChart from "../components/PerformanceCharts";
import Insights from "../components/Insights";

import "../components/Dashboard.css";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getToday());

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

  const activitiesForSelectedDate = activities.filter(
    (activity) => activity.date && activity.date.startsWith(selectedDate)
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">Your daily growth</span>
          <h1>
            Good day <span aria-hidden="true">👋</span>
          </h1>
          <p>Here's how you're doing today.</p>
        </div>
      </header>

      <section className="dashboard-section dashboard-calendar-section">
        <Calendar activities={activities} onDateSelect={setSelectedDate} />
      </section>

      <DashboardStats
        activities={activitiesForSelectedDate}
        selectedDate={selectedDate}
      />

      <WeeklyStats activities={activities} />

      <PerformanceChart activities={activities} />

      <Insights activities={activities} />
    </div>
  );
};

export default Dashboard;