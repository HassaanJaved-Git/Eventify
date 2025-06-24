// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/get-Name-Email-UserName-ProfilePic", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({
        name: res.data.name,
        userName: res.data.userName,
        profileImageURL: res.data.profileImageURL,
        email: res.data.email,
      });
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      logout();
    }
  };

  const refreshUserData = () => {
    if (token) fetchUserData(token);
  };

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        user,
        login,
        logout,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
