// import AddEditPage from "./components/AddEditPage/AddEditPage";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext'; 
import LoginPage from "./pages/LoginPage"; 
import ChooseCategoryTypePage from "./pages/ChooseCategoryTypePage"; 
import ChooseCategoryPage from "./pages/ChooseCategoryPage"; 
import ChooseMovePage from "./pages/ChooseMovePage"; 
import SettingsPage from "./pages/SettingsPage"; 
import SignupPage from "./pages/SignupPage"; 
import LoginError from './components/LoginError/LoginError'; // Import the fullscreen component

export default function App() {
  
  const [userExists, setUserExists] = useState(true);
  
  
  
  return (
    <UserProvider>
      <Router>
        {userExists === false && <LoginError />}

        <Routes>
          <Route path="/" element={<LoginPage setUserExists={setUserExists}/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/category-type" element={<ChooseCategoryTypePage />} />
          <Route path="/category" element={<ChooseCategoryPage />} />
          <Route path="/move" element={<ChooseMovePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}