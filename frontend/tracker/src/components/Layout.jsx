import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import {
  HomeIcon,
  CheckIcon,
  CalendarIcon,
  ChartIcon,
  TargetIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: HomeIcon, end: true },
  { to: "/activities", label: "Activities", icon: CheckIcon },
  { to: "/calendar", label: "Calendar", icon: CalendarIcon },
  { to: "/analytics", label: "Analytics", icon: ChartIcon },
  { to: "/goals", label: "Goals", icon: TargetIcon },
];

const getInitial = (name) =>
  name && name.length > 0 ? name.trim().charAt(0).toUpperCase() : "?";

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      {/* Mobile top bar */}
      <header className="mobile-topbar">
        <button
          type="button"
          className="icon-button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <MenuIcon />
        </button>

        <Logo size="sm" />

        <ThemeToggle />
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar${mobileOpen ? " sidebar--open" : ""}`}
      >
        <div className="sidebar__top">
          <Logo size="md" showTagline className="sidebar__logo" />

          <button
            type="button"
            className="icon-button sidebar__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `sidebar__link${isActive ? " sidebar__link--active" : ""}`
              }
            >
              <span className="sidebar__link-icon">
                <Icon />
              </span>
              <span className="sidebar__link-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="theme-toggle-row">
            <span className="sidebar__footer-label">Appearance</span>
            <ThemeToggle />
          </div>

          {user && (
            <div className="sidebar__user">
              <span className="sidebar__avatar" aria-hidden="true">
                {getInitial(user.name)}
              </span>

              <span className="sidebar__user-info">
                <span className="sidebar__user-name">{user.name}</span>
                <span className="sidebar__user-email">{user.email}</span>
              </span>

              <button
                type="button"
                className="icon-button sidebar__logout"
                onClick={logout}
                aria-label="Log out"
                title="Log out"
              >
                <LogoutIcon />
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;