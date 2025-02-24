import React from "react";
import "./TextInput.css"

export const TextInput = ({ label, name, placeholder="", value="", onChange }) => {
  return (
    <div className="mb-3 jast-textinput">
      {label && <label className="form-label d-block text-start" htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

export const TextInputContainer = ({ children }) => {
    return <div className="jast-textinput-container">{children}</div>;
};
