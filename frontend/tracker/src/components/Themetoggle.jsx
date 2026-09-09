import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "./icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun">
        <SunIcon />
      </span>

      <span className="theme-toggle__icon theme-toggle__icon--moon">
        <MoonIcon />
      </span>

      <span
        className="theme-toggle__thumb"
        style={{
          transform: isDark ? "translateX(20px)" : "translateX(0)",
        }}
      />
    </button>
  );
};

export default ThemeToggle;