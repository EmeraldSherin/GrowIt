import { generateInsights } from "../utils/insightUtils";

const Insights = ({ activities }) => {

  const insights =
    generateInsights(activities);

  return (
    <div>

      <h2>Meaningful Insights</h2>

      {insights.length === 0 ? (

        <p>
          Keep tracking activities to generate insights.
        </p>

      ) : (

        insights.map((insight, index) => (

          <div key={index}>

            <h3>
              {insight.title}
            </h3>

            <p>
              {insight.message}
            </p>

          </div>

        ))

      )}

    </div>
  );
};

export default Insights;