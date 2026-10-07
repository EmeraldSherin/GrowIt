import { useMemo, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calender = ({ activities, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const today = new Date();

  const buildDateString = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

  /*
   * Build the activity summary once instead of filtering the
   * complete activity array for every calendar cell.
   */
  const dateSummary = useMemo(() => {
    const summary = {};

    activities.forEach((activity) => {
      if (!activity.date) return;

      const dateKey = activity.date.split("T")[0];

      if (!summary[dateKey]) {
        summary[dateKey] = {
          total: 0,
          completed: 0,
          pending: 0,
          inProgress: 0,
        };
      }

      summary[dateKey].total += 1;

      if (activity.status === "Completed") {
        summary[dateKey].completed += 1;
      } else if (activity.status === "In Progress") {
        summary[dateKey].inProgress += 1;
      } else {
        summary[dateKey].pending += 1;
      }
    });

    return summary;
  }, [activities]);

  const getDaySummary = (day) => {
    return dateSummary[buildDateString(day)] || {
      total: 0,
      completed: 0,
      pending: 0,
      inProgress: 0,
    };
  };

  const getDayLevel = (summary) => {
    if (summary.total === 0) {
      return "empty";
    }

    const completionRate =
      (summary.completed / summary.total) * 100;

    if (completionRate === 100) {
      return "complete";
    }

    if (completionRate >= 50) {
      return "partial";
    }

    return "planned";
  };

  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div>
          <span className="section-eyebrow">Activity tracker</span>
          <h2>Activity Calendar</h2>
        </div>

        <div className="calendar__navigation">
          <button
            type="button"
            className="calendar__nav-button"
            onClick={goToPreviousMonth}
            aria-label="Previous month"
          >
            ←
          </button>

          <strong className="calendar__month">
            {monthName} {year}
          </strong>

          <button
            type="button"
            className="calendar__nav-button"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="calendar__legend">
        <span>
          <i className="calendar__legend-dot calendar__legend-dot--empty" />
          No activity
        </span>

        <span>
          <i className="calendar__legend-dot calendar__legend-dot--planned" />
          Planned
        </span>

        <span>
          <i className="calendar__legend-dot calendar__legend-dot--partial" />
          In progress
        </span>

        <span>
          <i className="calendar__legend-dot calendar__legend-dot--complete" />
          Completed
        </span>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar__grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="calendar__empty"
          />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dateString = buildDateString(day);
          const summary = getDaySummary(day);
          const level = getDayLevel(summary);

          return (
            <button
              type="button"
              key={day}
              className={[
                "calendar__day",
                isToday(day)
                  ? "calendar__day--today"
                  : "",
                `calendar__day--${level}`,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onDateSelect(dateString)}
            >
              <span className="calendar__day-number">
                {day}
              </span>

              {summary.total > 0 && (
                <span className="calendar__activity">
                  <span className="calendar__activity-dot" />

                  <span>
                    {summary.completed}/{summary.total}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;