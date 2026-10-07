const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};


// ==========================================
// DAILY ANALYTICS
// ==========================================

export const getDailyAnalytics = async (date) => {
  const response = await fetch(
    `${API_URL}/analytics/daily?date=${date}`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch daily analytics");
  }

  return response.json();
};


// ==========================================
// WEEKLY ANALYTICS
// ==========================================

export const getWeeklyAnalytics = async (date) => {
  const response = await fetch(
    `${API_URL}/analytics/weekly?date=${date}`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weekly analytics");
  }

  return response.json();
};


// ==========================================
// CATEGORY ANALYTICS
// ==========================================

export const getCategoryAnalytics = async () => {
  const response = await fetch(
    `${API_URL}/analytics/categories`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch category analytics"
    );
  }

  return response.json();
};


// ==========================================
// STREAK ANALYTICS
// ==========================================

export const getStreakAnalytics = async () => {
  const response = await fetch(
    `${API_URL}/analytics/streaks`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch streak analytics"
    );
  }

  return response.json();
};