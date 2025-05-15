import "./Navbar.css"
import ProgressBar from "../ProgressBar/ProgressBar";
import BackButton from "../BackButton/BackButton";
import { useNavigate } from 'react-router-dom';

const Navbar = ({navbarIsOpen, setNavbarIsOpen}) => {
  const navigate = useNavigate();

  return (
    <div className="nav-bar z-2">
        <div className={`nav-bar-head ${navbarIsOpen ? "open" : ""}`}>
          <div className="nav-bar-head-main">
            <BackButton text={"Login"} />
            <ProgressBar progress={1}/>
            <button
              className="navbar-button"
              onClick={() => {
                setNavbarIsOpen(!navbarIsOpen)
              }}
            > 
              <i className="fa-regular fa-pen-to-square nav-bar-setting-icon"></i>
            </button>
          </div>
        </div>

        
        <div className={`nav-bar-main ${navbarIsOpen ? "open" : "closed"}`}>
          <div className="nav-bar-main-wrapper">
            <ul className="nav-bar-main-list">
              <li className="nav-bar-main-item">
                <a
                  href="#" className="nav-bar-link" onClick={() => {navigate("/settings-add-category");}}
                >Add Category</a>
              </li>
              <li className="nav-bar-main-item">
                <a
                  href="#" className="nav-bar-link" onClick={() => {navigate("/signup");}}
                >Edit Category</a>
              </li>
              <li className="nav-bar-main-item">
                <a
                  href="#" className="nav-bar-link" onClick={() => {navigate("/settings-add-move");}}
                >Add Move</a>
              </li>
              <li className="nav-bar-main-item">
                <a
                  href="#" className="nav-bar-link" onClick={() => {navigate("/settings-edit-move");}}
                >Edit Move</a>
              </li>
            </ul>
          </div>
        </div>
        
    </div>
  )
};

export default Navbar;
