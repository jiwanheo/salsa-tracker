// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};

// User provider component
export const UserProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);  // Set user data when logged in
  };

  const logout = () => {
    setUser(null);  // Remove user data when logged out
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}  {/* Render the app inside this provider */}
    </UserContext.Provider>
  );
};
