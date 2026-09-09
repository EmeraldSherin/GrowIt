const API_URL =
  `${import.meta.env.VITE_API_URL}/activities`;


// Get token
const getAuthHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {
    "Content-Type": "application/json",

    Authorization:
      `Bearer ${token}`
  };
};


// GET ACTIVITIES
export const getActivities = async () => {

  const response = await fetch(
    API_URL,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch activities"
    );
  }

  return await response.json();
};


// CREATE ACTIVITY
export const createActivity = async (
  activity
) => {

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: getAuthHeaders(),

      body: JSON.stringify(activity)
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create activity"
    );
  }

  return await response.json();
};


// UPDATE ACTIVITY
export const updateActivity = async (
  id,
  activity
) => {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",

      headers: getAuthHeaders(),

      body: JSON.stringify(activity)
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update activity"
    );
  }

  return await response.json();
};


// DELETE ACTIVITY
export const deleteActivity = async (
  id
) => {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",

      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete activity"
    );
  }

  return await response.json();
};