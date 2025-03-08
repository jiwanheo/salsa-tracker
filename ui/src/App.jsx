// import AddEditPage from "./components/AddEditPage/AddEditPage";
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from './UserContext'; 
import { useTopPageContext, TopPageContextProvider } from './TopPageContext';
import LoginPage from "./pages/LoginPage"; 
import ChooseCategoryTypePage from "./pages/ChooseCategoryTypePage"; 
import ChooseCategoryPage from "./pages/ChooseCategoryPage"; 
import ChooseMovePage from "./pages/ChooseMovePage"; 
import SettingsPage from "./pages/SettingsPage"; 
import SignupPage from "./pages/SignupPage"; 
import TopPageInfoBar from './components/TopPageInfoBar/TopPageInfoBar'; // Import the fullscreen component

export function App() {
  const location = useLocation();
  const { setTopPageContextMessage } = useTopPageContext();

  useEffect(() => {
    // Reset the message every time the route changes
    setTopPageContextMessage({ text: '', type: '' });
  }, [location, setTopPageContextMessage]);

  return (
    <>
      <TopPageInfoBar />
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/category-type" element={<ChooseCategoryTypePage />} />
        <Route path="/category" element={<ChooseCategoryPage />} />
        <Route path="/move" element={<ChooseMovePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

// Wrap everything with Router and Context Providers
export function Root() {
  return(
    <Router>
      <TopPageContextProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </TopPageContextProvider>
    </Router>
  );
}