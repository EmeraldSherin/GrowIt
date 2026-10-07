const API_URL =
  `${import.meta.env.VITE_API_URL}/goals`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export const getGoals = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }

  return await response.json();
};

export const createGoal = async (goal) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(goal)
  });

  if (!response.ok) {
    throw new Error("Failed to create goal");
  }

  return await response.json();
};

export const updateGoal = async (id, goal) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(goal)
  });

  if (!response.ok) {
    throw new Error("Failed to update goal");
  }

  return await response.json();
};

export const deleteGoal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to delete goal");
  }

  return await response.json();
};

export const getGoalProgress = async (id, date) => {
  const response = await fetch(
    `${API_URL}/${id}/progress?date=${date}`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch goal progress"
    );
  }

  return await response.json();
};