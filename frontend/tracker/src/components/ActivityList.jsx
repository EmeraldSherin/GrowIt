import { useMemo, useState } from "react";
import ActivityCard from "./ActivityCard";

const ActivityList = ({ activities, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-newest");

  const processedActivities = useMemo(() => {
    let result = [...activities];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((activity) =>
        [
          activity.title,
          activity.description,
          activity.category,
          activity.notes,
        ].some((value) =>
          String(value || "").toLowerCase().includes(search)
        )
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter(
        (activity) => activity.status === statusFilter
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-newest":
          return new Date(b.date) - new Date(a.date);

        case "date-oldest":
          return new Date(a.date) - new Date(b.date);

        case "priority-high":
          return (
            getPriorityValue(b.priority) -
            getPriorityValue(a.priority)
          );

        case "priority-low":
          return (
            getPriorityValue(a.priority) -
            getPriorityValue(b.priority)
          );

        case "planned-high":
          return (
            Number(b.plannedMinutes || 0) -
            Number(a.plannedMinutes || 0)
          );

        case "actual-high":
          return (
            Number(b.actualMinutes || 0) -
            Number(a.actualMinutes || 0)
          );

        case "category":
          return String(a.category || "").localeCompare(
            String(b.category || "")
          );

        case "status":
          return String(a.status || "").localeCompare(
            String(b.status || "")
          );

        default:
          return 0;
      }
    });

    return result;
  }, [activities, searchTerm, statusFilter, sortBy]);

  return (
    <section className="dashboard-section activity-list-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Your activities</span>
          <h2>Activity List</h2>
        </div>

        <span className="section-meta">
          {processedActivities.length}{" "}
          {processedActivities.length === 1
            ? "activity"
            : "activities"}
        </span>
      </div>

      {/* Search / Filter / Sort */}
      <div className="activity-list-controls">
        <div className="activity-search">
          <label htmlFor="activity-search">Search</label>

          <input
            id="activity-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search activities..."
          />
        </div>

        <div className="activity-filter">
          <label htmlFor="activity-status-filter">Status</label>

          <select
            id="activity-status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="activity-sort">
          <label htmlFor="activity-sort">Sort by</label>

          <select
            id="activity-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="date-newest">Date — Newest</option>
            <option value="date-oldest">Date — Oldest</option>
            <option value="priority-high">
              Priority — High to Low
            </option>
            <option value="priority-low">
              Priority — Low to High
            </option>
            <option value="planned-high">
              Planned Time — Highest
            </option>
            <option value="actual-high">
              Actual Time — Highest
            </option>
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="activity-list__empty">
          <p>
            No activities yet. Add your first one above to start
            tracking.
          </p>
        </div>
      ) : processedActivities.length === 0 ? (
        <div className="activity-list__empty">
          <p>No activities match your current search or filters.</p>
        </div>
      ) : (
        <div className="activity-grid">
          {processedActivities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const getPriorityValue = (priority) => {
  switch (priority) {
    case "High":
      return 3;
    case "Medium":
      return 2;
    case "Low":
      return 1;
    default:
      return 0;
  }
};

export default ActivityList;