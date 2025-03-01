// import AddEditPage from "./components/AddEditPage/AddEditPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import ChooseCategoryTypePage from "./pages/ChooseCategoryTypePage"; 
import SettingsPage from "./pages/SettingsPage"; 
import SignupPage from "./pages/SignupPage"; 

export default function App() {
  
  
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<ChooseCategoryTypePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}