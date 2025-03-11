import React from "react";
import "./BackButton.css"
import { useNavigate } from 'react-router-dom';

const BackButton = ({ text, to }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate(to);
    };

    return (
        <a href="#" className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left back-icon"></i> 
            {/* <span>{text}</span> */}
        </a>
    );
};

export default BackButton;