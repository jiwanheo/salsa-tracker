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
        <div className="card jast-card jast-move-card shadow-sm">
            <div className="card-body w-100">
                <div className="jast-move-card-header w-100 mb-3">
                    <div className="">
                        <h3 className="text-start mb-0">{moveName}</h3>
                    </div>
                    <div className="">
                        <RatingBadge rating={rating} /> 
                    </div>
                </div>
                    
                <div className="mb-3">
                    <p className="move-description text-start">{moveDescription}</p>
                </div>
                
                <div className={`collapse ${isOpen ? 'show' : ''}`}>
                    <div className="mb-3">
                        <img src={video} alt="Preview" className="img-fluid" />
                    </div>
                    <div className="change-rating">
                        <h6>Change Rating</h6>
                        <div>
                            <button className="btn btn-success me-2" onClick={() => setRating("good")}>
                                Good
                            </button>
                            <button className="btn btn-warning me-2" onClick={() => setRating("ok")}>
                                OK
                            </button>
                            <button className="btn btn-danger" onClick={() => setRating("bad")}>
                                Bad
                            </button>
                        </div>

                    </div>
                </div>

                <div>
                    <button className="btn pb-0 d-flex" onClick={toggleCard}>
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MoveCard;
