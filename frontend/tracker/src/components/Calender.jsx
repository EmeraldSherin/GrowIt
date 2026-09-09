import { useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calender = ({ activities, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const today = new Date();

  const buildDateString = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

  const getActivityCount = (day) => {
    const dateString = buildDateString(day);
    return activities.filter(
      (activity) => activity.date && activity.date.startsWith(dateString)
    ).length;
  };

  const isToday = (day) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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

      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar__grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar__empty" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const count = getActivityCount(day);
          const dateString = buildDateString(day);

          return (
            <button
              type="button"
              key={day}
              className={`calendar__day${
                isToday(day) ? " calendar__day--today" : ""
              }${count > 0 ? " calendar__day--active" : ""}`}
              onClick={() => onDateSelect(dateString)}
            >
              <span className="calendar__day-number">{day}</span>

              {count > 0 && (
                <span className="calendar__activity">
                  <span className="calendar__activity-dot" />
                  {count}
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