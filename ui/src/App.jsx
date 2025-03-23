// import AddEditPage from "./components/AddEditPage/AddEditPage";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from './UserContext'; 
import { useTopPageContext, TopPageContextProvider } from './TopPageContext';
import LoginPage from "./pages/LoginPage"; 
import ChooseCategoryTypePage from "./pages/ChooseCategoryTypePage"; 
import ChooseCategoryPage from "./pages/ChooseCategoryPage"; 
import ChooseMovePage from "./pages/ChooseMovePage"; 
import SettingAddCategoryPage from "./pages/SettingAddCategoryPage"; 
import SignupPage from "./pages/SignupPage"; 
import TopPageInfoBar from './components/TopPageInfoBar/TopPageInfoBar'; // Import the fullscreen component
import Navbar from './components/Navbar/Navbar';
import BlackOverlay from './components/BlackOverlay/BlackOverlay';

export function App() {
  const location = useLocation();
  const { setTopPageContextMessage } = useTopPageContext();
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);

  useEffect(() => {
    // Reset the message every time the route changes
    setTopPageContextMessage({ text: '', type: '' });
  }, [location, setTopPageContextMessage]);

  return (
    <>
      <TopPageInfoBar />
      <Navbar navbarIsOpen={navbarIsOpen} setNavbarIsOpen={setNavbarIsOpen}/>
      <BlackOverlay navbarIsOpen={navbarIsOpen} setNavbarIsOpen={setNavbarIsOpen}/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/category-type" element={<ChooseCategoryTypePage />} />
        <Route path="/category" element={<ChooseCategoryPage />} />
        <Route path="/move" element={<ChooseMovePage />} />
        <Route path="/settings-add-category" element={<SettingAddCategoryPage />} />
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