import "./Logo.css";

const LETTERS = ["r", "o", "w", "I", "t"];

const Logo = ({
  size = "md",
  showTagline = false,
  animated = false,
  className = "",
}) => {
  return (
    <div
      className={`growit-logo growit-logo--${size}${
        animated ? " growit-logo--animated" : ""
      } ${className}`}
    >

      <div className="growit-wordmark">

        {/* =========================================
            G + LARGE TREND ICON
        ========================================== */}

        <span className="growit-g-container">

          {/* BIG TREND ICON — BEHIND G */}

          <svg
  className="growit-trend-icon"
  viewBox="0 0 200 500"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  {/* Long rising trend line */}

  <path
    d="M15 270 L85 200 L135 245 L275 45"
    fill="none"
    stroke="currentColor"
    strokeWidth="28"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {/* Large arrow head */}

  <path
    d="M225 45 H275 V95"
    fill="none"
    stroke="currentColor"
    strokeWidth="28"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>


          {/* =====================================
              G — IN FRONT OF TREND ICON
          ====================================== */}

          <span className="growit-g">
            G
          </span>

        </span>


        {/* =========================================
            rowIt
        ========================================== */}

        <span
          className="growit-rest"
          aria-hidden="true"
        >

          {LETTERS.map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="growit-letter"
              style={
                animated
                  ? {
                      animationDelay:
                        `${650 + i * 70}ms`,
                    }
                  : undefined
              }
            >
              {letter}
            </span>
          ))}

        </span>

      </div>


      {/* Accessible name */}

      <span className="visually-hidden">
        GrowIt
      </span>


      {/* Tagline */}

      {showTagline && (
        <span
          className="growit-logo__tagline"
          style={
            animated
              ? {
                  animationDelay:
                    "1080ms",
                }
              : undefined
          }
        >
          Small steps, big growth
        </span>
      )}

    </div>
  );
};

export default Logo;