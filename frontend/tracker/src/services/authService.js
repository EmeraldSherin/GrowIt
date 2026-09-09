const API_URL =
  `${import.meta.env.VITE_API_URL}/auth`;

// Register
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};


// Login
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};


// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


// Get stored token
export const getToken = () => {
  return localStorage.getItem("token");
};


// Get stored user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};