import { getDailyPerformanceScore } from "../utils/analiticsUtils";
const HeatMap = ({activities}) => {
    const getDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getLast365Days = () => {

    const days = [];

    const today = new Date();

    for (let i = 364; i >= 0; i--) {

      const date = new Date(today);

      date.setDate(
        today.getDate() - i
      );

      days.push(date);
    }

    return days;
  };

  const getDailyScore = (date) => {

  const dateKey =
    date.toISOString().split("T")[0];

  return getDailyPerformanceScore(
    activities,
    dateKey
  );
};

const getLevel = (score) => {

  if (score === 0) {
    return 0;
  }

  if (score < 40) {
    return 1;
  }

  if (score < 70) {
    return 2;
  }

  if (score < 90) {
    return 3;
  }

  return 4;
};

  const days = getLast365Days();

  return (
    <div>
      <h2>Consistency Heatmap</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(30, 20px)",
          gap: "4px"
        }}
      >

        {days.map((date) => {

          const score =
              getDailyScore(date);

          const level =
              getLevel(score);

          return (
            <div
              key={date.toISOString()}
              title={`${getDateKey(date)} - Performance: ${score}/100`}
              style={{
                width: "20px",
                height: "20px",
                border: "1px solid #ccc",
                backgroundColor:
                level === 0
                  ? "#eeeeee"
                  : level === 1
                  ? "#c6e48b"
                  : level === 2
                  ? "#7bc96f"
                  : level === 3
                  ? "#40c463"
                  : "#239a3b"
              }}
            />
          );
        })}

      </div>

    </div>
  )
}

export default HeatMap
