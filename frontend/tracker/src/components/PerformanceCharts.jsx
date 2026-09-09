import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getLast7Days, getDailyPerformanceScore } from "../utils/analiticsUtils";

const formatDayLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });

const PerformanceChart = ({ activities }) => {
  const data = getLast7Days().map((date) => ({
    date,
    day: formatDayLabel(date),
    score: getDailyPerformanceScore(activities, date),
  }));

  return (
    <section className="dashboard-section performance-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Performance</span>
          <h2>Performance Trend</h2>
          <p className="section-description">
            Your performance over the last 7 days
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="4 5"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            stroke="var(--color-text-secondary)"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            stroke="var(--color-text-secondary)"
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [`${value}/100`, "Performance"]}
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              color: "var(--color-text)",
            }}
            labelStyle={{ color: "var(--color-text-secondary)" }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ r: 4, fill: "var(--color-primary)" }}
            activeDot={{ r: 7, fill: "var(--color-primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default PerformanceChart;