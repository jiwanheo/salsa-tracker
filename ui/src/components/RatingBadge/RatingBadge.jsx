import React from "react";
import "./RatingBadge.css"; 

const RatingBadge = ({ rating, selectedRating, onClick }) => {
    const getBadgeEmoji = () => {
        switch (rating) {
          case "good":
            return "smile";
          case "ok":
            return "meh";
          case "bad":
            return "sad-cry";
        }
      };
    
      console.log(rating, selectedRating)
    const isGreyedOut = rating !== selectedRating;

    return (
        <div className="rating-badge-container">
          <div className={`rating-badge rating-badge-${rating} ${isGreyedOut ? "greyed-out-rating-badge" : ""} w-100`} onClick={onClick}>
              <i class={`fa-regular fa-face-${getBadgeEmoji()}`}></i>
          </div>
        </div>
    );
};

export default RatingBadge;