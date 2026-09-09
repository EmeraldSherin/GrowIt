import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getToken,
  getCurrentUser
} from "../services/authService";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Check login when application starts
  useEffect(() => {

    const token = getToken();
    const storedUser = getCurrentUser();

    if (token && storedUser) {
      setUser(storedUser);
    }

    setLoading(false);

  }, []);


  // LOGIN
  const login = async (email, password) => {

    const data = await loginUser({
      email,
      password
    });

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };


  // REGISTER
  const register = async (
    name,
    email,
    password
  ) => {

    const data = await registerUser({
      name,
      email,
      password
    });

    return data;
  };


  // LOGOUT
  const logout = () => {

    logoutUser();

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook
export const useAuth = () => {

  return useContext(AuthContext);

};