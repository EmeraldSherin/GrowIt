import { getCategoryStats } from "../utils/analiticsUtils";

const CategoryStats = ({ activities }) => {
  const categories = getCategoryStats(activities);

  return (
    <section className="dashboard-section category-stats-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Breakdown</span>
          <h2>Category Performance</h2>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="category-stats__empty">
          <p>Add activities to see category analysis.</p>
        </div>
      ) : (
        <div className="category-stats__list">
          {categories.map((item) => (
            <div className="category-card" key={item.category}>
              <div className="category-card__header">
                <h3 className="category-card__name">{item.category}</h3>
                <span className="category-card__rate">
                  {item.completionRate}%
                </span>
              </div>

              <div className="category-card__progress-track">
                <div
                  className="category-card__progress-fill"
                  style={{ width: `${item.completionRate}%` }}
                />
              </div>

              <div className="category-card__meta">
                <span>
                  {item.completed}/{item.total} completed
                </span>
                <span>{item.plannedMinutes} min planned</span>
                <span>{item.actualMinutes} min actual</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryStats;