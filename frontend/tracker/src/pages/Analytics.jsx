import { useEffect, useState } from "react";

import { getActivities } from "../services/activityService";

import WeeklyStats from "../components/WeeklyStats";
import PerformanceChart from "../components/PerformanceCharts";
import CategoryStats from "../components/CategoryStats";
import StreakStats from "../components/StreakStats";
import Insights from "../components/Insights";
import HeatMap from "../components/HeatMap";

import "../components/Dashboard.css";
import "../components/Analytics.css";

const Analytics = () => {
  const [activities, setActivities] = useState([]);

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

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">Know your patterns</span>
          <h1>Analytics</h1>
          <p>Understand your productivity patterns.</p>
        </div>
      </header>

      <WeeklyStats activities={activities} />
      <PerformanceChart activities={activities} />
      <CategoryStats activities={activities} />
      <StreakStats activities={activities} />
      <Insights activities={activities} />
      <HeatMap activities={activities} />
    </div>
  );
};

export default Analytics;