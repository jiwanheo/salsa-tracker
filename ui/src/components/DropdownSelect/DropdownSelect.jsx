// Dropdown.js
import React from 'react';

const Dropdown = ({ label, choices, onChange, placeholder }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue); // returns move_id
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
      <select defaultValue="" onChange={handleChange}>
        <option value="" disabled>{placeholder}</option>
        {choices.map((choice, idx) => (
          <option key={idx} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
