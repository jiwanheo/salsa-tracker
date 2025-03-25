import "./MultiSelect.css";
import { useState, useRef, useEffect } from "react";

export default function MultiSelect({options}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle selection changes
    const handleCheckboxChange = (option) => {
        setSelectedOptions((prev) => {
            const exists = prev.find((item) => item.id === option.id);
            return exists ? prev.filter((item) => item.id !== option.id) : [...prev, option];
        });
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="container multiselect-container">
            <div className="dropdown" ref={dropdownRef}>
                <div
                    className="form-control d-flex align-items-center mb-2 shadow-sm"
                    onClick={toggleDropdown}
                >
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((option) => (
                            <span key={option.id} className="badge bg-primary me-2">
                                {option.name} &times;
                            </span>
                        ))
                    ) : (
                        <span className="text-muted">Select Options</span>
                    )}
                </div>
                {isOpen && (
                <div className="multi-select-ul-container shadow-sm">
                    <ul className="multi-select-ul">
                        {options.map((group, index) => (
                            <div key={index}>
                                <span>
                                    <strong>{group.category}</strong>
                                </span>
                                {group.items.map((item) => (
                                    <li key={item.id}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={item.id}
                                                checked={selectedOptions.some((opt) => opt.id === item.id)}
                                                onChange={() => handleCheckboxChange(item)}
                                            />
                                            <label className="form-check-label" htmlFor={item.id}>
                                                {item.name}
                                            </label>
                                        </div>
                                    </li>
                                ))}                             
                                {index < options.length - 1 && <hr />}
                            </div>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>
    )
}
