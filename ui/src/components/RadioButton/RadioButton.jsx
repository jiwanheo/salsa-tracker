import "./RadioButton.css"; 
import { useState } from "react";
import { getRandomImage } from "../../utils/RandomImage.js";

const RadioButton = ({label, options, newMoveRating, setNewMoveRating}) => {

    return (
        <div className="radiobutton-container">
            <span>{label}</span>
            <div className="d-flex gap-3 flex-wrap radiobutton-body">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`radiobutton-option card p-3 text-center shadow-sm ${
                            newMoveRating === option.value ? "selected" : ""
                        }`}
                    >
                        <input
                            type="radio"
                            name="radio-options"
                            value={option.value}
                            checked={newMoveRating === option.value || false}
                            onChange={() => setNewMoveRating(option.value)}
                            className="d-none"
                        />
                        <div className="radiobutton-body-content">
                            <div className={`radiobutton-circle ${newMoveRating === option.value ? "selected" : ""}`} />

                            <div className="radiobutton-body-content-main">
                                <div className="radiobutton-image-container">
                                    <img src={getRandomImage()} alt={option.label} className="img-fluid mb-2" />
                                </div>
                                <div className="radiobutton-text">
                                    <p className="mb-0">{option.label}</p>
                                </div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>
        </div>
      );
}

export default RadioButton;