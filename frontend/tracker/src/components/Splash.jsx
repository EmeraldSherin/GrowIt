import Logo from "./Logo";
import "./Splash.css";

const Splash = ({ leaving = false }) => {
  return (
    <div
      className={`splash-screen${
        leaving ? " splash-screen--leaving" : ""
      }`}
      role="status"
      aria-label="Loading GrowIt"
    >
      <div className="splash-screen__content">

        <Logo
          size="lg"
          showTagline
          animated
          className="splash-logo"
        />

        <div
          className="splash-loading"
          aria-hidden="true"
        >
          <span />
        </div>

      </div>
    </div>
  );
};

export default Splash;