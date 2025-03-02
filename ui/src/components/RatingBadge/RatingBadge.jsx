import React from "react";
import "./RatingBadge.css"; 

const RatingBadge = ({ rating }) => {
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

    return (
        <div className={`rating-badge rating-badge-${rating} w-100`}>
            <i class={`fa-regular fa-face-${getBadgeEmoji()}`}></i>
        </div>
    );
};

export default RatingBadge;
