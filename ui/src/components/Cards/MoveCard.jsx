import "./MoveCard.css"
import React, { useState } from 'react';

const MoveCard = ({ moveName, moveDescription, rating, anotherText, video }) => {

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
                    <div className="rating-badge">
                        <p>{rating}</p>
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
                            Good OK Bad
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
