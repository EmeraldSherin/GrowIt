import { getDailyPerformanceScore, getLast365Days } from "../utils/analiticsUtils";

const getLevel = (score) => {
  if (score === 0) return 0;
  if (score < 40) return 1;
  if (score < 70) return 2;
  if (score < 90) return 3;
  return 4;
};

const formatDateLabel = (dateKey) =>
  new Date(`${dateKey}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const HeatMap = ({ activities }) => {
  const days = getLast365Days();

  return (
    <section className="dashboard-section heatmap-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Consistency</span>
          <h2>Yearly Heatmap</h2>
          <p className="section-description">
            Daily performance over the last 365 days
          </p>
        </div>
      </div>

      <div className="heatmap">
        <div className="heatmap__grid">
          {days.map((dateKey) => {
            const score = getDailyPerformanceScore(activities, dateKey);
            const level = getLevel(score);

            return (
              <div
                key={dateKey}
                className={`heatmap__cell heatmap__cell--level-${level}`}
                title={`${formatDateLabel(dateKey)} — Performance: ${score}/100`}
              />
            );
          })}
        </div>
      </div>

      <div className="heatmap__legend">
        <span>Less</span>
        <span className="heatmap__cell heatmap__cell--level-0" />
        <span className="heatmap__cell heatmap__cell--level-1" />
        <span className="heatmap__cell heatmap__cell--level-2" />
        <span className="heatmap__cell heatmap__cell--level-3" />
        <span className="heatmap__cell heatmap__cell--level-4" />
        <span>More</span>
      </div>
    </section>
  );
};

export default HeatMap;