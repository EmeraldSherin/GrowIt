import { useState } from "react";

const Calender=({ activities, onDateSelect })=> {

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long"
    }
  );

  const getActivityCount = (day) => {

    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return activities.filter(
      (activity) =>
        activity.date.startsWith(dateString)
    ).length;
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  return (
    <div>

      <h2>Activity Calendar</h2>

      <div>

        <button onClick={previousMonth}>
          ←
        </button>

        <strong>
          {monthName} {year}
        </strong>

        <button onClick={nextMonth}>
          →
        </button>

      </div>

      <br />

      <div>
        Sun&nbsp;&nbsp;
        Mon&nbsp;&nbsp;
        Tue&nbsp;&nbsp;
        Wed&nbsp;&nbsp;
        Thu&nbsp;&nbsp;
        Fri&nbsp;&nbsp;
        Sat
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(7, 1fr)",
          gap: "10px",
          marginTop: "10px"
        }}
      >

        {Array.from({
          length: firstDay
        }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({
          length: daysInMonth
        }).map((_, index) => {

          const day = index + 1;

          const count =
            getActivityCount(day);

          return (
            <button
              key={day}
              onClick={() => {

                const dateString =
                  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                onDateSelect(dateString);
              }}
            >

              <div>{day}</div>

              {count > 0 && (
                <small>
                  {count} activities
                </small>
              )}

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Calender;