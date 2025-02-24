import React from "react";
import "./Button.css"

const Button = ({ label, onClick, variant = "primary" }) => {
  return (
    <button className={`btn btn-${variant} jast-button`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;