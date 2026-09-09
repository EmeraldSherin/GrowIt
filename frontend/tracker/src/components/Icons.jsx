// Small, consistent line-icon set for GrowIt.
// Single stroke weight, rounded caps, 24x24 grid — kept dependency-free
// so the redesign doesn't require adding an icon library to the project.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const HomeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" {...base} {...props}>
    <path d="M4 11.2 12 4l8 7.2" />
    <path d="M6 9.8V19a1 1 0 0 0 1 1h3.2v-4.6a1.8 1.8 0 0 1 1.8-1.8v0a1.8 1.8 0 0 1 1.8 1.8V20H17a1 1 0 0 0 1-1V9.8" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" {...base} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <path d="m8.5 12.3 2.4 2.4 4.6-5.4" />
  </svg>
);

export const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" {...base} {...props}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
    <path d="M4 10h16M8 3.5v3M16 3.5v3" />
  </svg>
);

export const ChartIcon = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" {...base} {...props}>
    <path d="M4 20V10M11 20V4M18 20v-6" />
    <path d="M3 20h18" />
  </svg>
);

export const TargetIcon = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" {...base} {...props}>
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...props}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.8v2M12 19.2v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.8 12h2M19.2 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...props}>
    <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
  </svg>
);

export const LogoutIcon = (props) => (
  <svg viewBox="0 0 24 24" width="17" height="17" {...base} {...props}>
    <path d="M15 4.5h2.5A1.5 1.5 0 0 1 19 6v12a1.5 1.5 0 0 1-1.5 1.5H15" />
    <path d="M11 8l-4 4 4 4M7 12h11" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
    <path d="M4 6.5h16M4 12h16M4 17.5h16" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const TrendUpIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
    <polyline points="3 20 10 12.5 14 16.5 21 4" />
    <polyline points="15 4 21 4 21 10" />
  </svg>
);