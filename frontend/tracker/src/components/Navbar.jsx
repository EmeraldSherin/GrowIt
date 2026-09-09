import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>

      <h2>📈 GrowIt</h2>

      <div>
        <Link to="/">Dashboard</Link>

        <Link to="/activities">
          Activities
        </Link>

        <Link to="/calendar">
          Calendar
        </Link>

        <Link to="/analytics">
          Analytics
        </Link>

        <Link to="/goals">
          Goals
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;