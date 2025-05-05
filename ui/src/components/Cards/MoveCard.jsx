import "./MoveCard.css"
import React, { useState } from 'react';
import RatingBadge from "../RatingBadge/RatingBadge"; // Import the badge component

const MoveCard = ({ moveName, moveDescription, rating: initialRating, video }) => {
    const [rating, setRating] = useState(initialRating); // State to track rating
    const [isOpen, setIsOpen] = useState(false);
    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="card jast-card jast-move-card shadow-sm" onClick={toggleCard}>
            <div className="card-body w-100">
                <div className="jast-move-card-header w-100 mb-3">
                    <h3 className="text-start mb-0">{moveName}</h3>
                    <RatingBadge rating={rating} selectedRating={rating}/> 
                </div>
                    
                <div className="mb-4">
                    <p className="move-description text-start">{moveDescription}</p>
                </div>
                
                <div 
                    className={`collapse-content ${isOpen ? 'show' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="collapse-content-body">
                        <div className="mb-4">
                            <img src={video} alt="Preview" className="img-fluid" />
                        </div>
                        <div className="change-rating d-flex flex-column align-items-center mb-4">
                            <h6>Change Rating</h6>
                            <div className="d-flex w-100 justify-content-center align-items-center gap-4" >
                                <RatingBadge rating="good" selectedRating={rating} onClick={() => setRating("good")}/>
                                <RatingBadge rating="ok" selectedRating={rating} onClick={() => setRating("ok")}/>
                                <RatingBadge rating="bad" selectedRating={rating} onClick={() => setRating("bad")}/>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <i className={`fa-solid fa-angle-down chevron ${isOpen ? "rotate" : ""}`}></i>
                </div>

            </div>
        </div>
    );
};

export default MoveCard;
