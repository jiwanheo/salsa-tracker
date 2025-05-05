import React from "react";
import "./BackButton.css"
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
    const navigate = useNavigate();

    const handleBackClick = (e) => {
        e.preventDefault();

        if (to) {
            navigate(to);
        } else {
            if (window.history.length <= 2) {
                // Not enough history stack (e.g. direct visit)
                navigate("/"); // or whatever your fallback page is
            } else {
                navigate(-1); // go back in browser history
            }
        }
    };

    return (
        <a href="#" className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left back-icon"></i> 
        </a>
    );
};

export default BackButton;