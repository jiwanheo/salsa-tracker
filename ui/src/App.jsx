// import AddEditPage from "./components/AddEditPage/AddEditPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import ChooseCategoryTypePage from "./pages/ChooseCategoryTypePage"; 
import ChooseCategoryPage from "./pages/ChooseCategoryPage"; 
import ChooseMovePage from "./pages/ChooseMovePage"; 
import SettingsPage from "./pages/SettingsPage"; 
import SignupPage from "./pages/SignupPage"; 

export default function App() {
  
  
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/category-type" element={<ChooseCategoryTypePage />} />
        <Route path="/category" element={<ChooseCategoryPage />} />
        <Route path="/move" element={<ChooseMovePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}