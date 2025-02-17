import { useState } from "react";
import "./MoveCard.css"; // Optional if you want custom styles
import PropTypes from "prop-types";

export default function MoveCard({ move, index, updateMoveRating }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(move.rating || "Ok");

  const toggleCard = () => setIsExpanded((prev) => !prev);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (updateMoveRating) {
      updateMoveRating(index, newRating);
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case "Bad": return "🔴";
      case "Ok": return "🟠";
      case "Good": return "🟢";
      default: return "⚪";
    }
  };

  return (
    <div className="card p-3 shadow-sm" style={{ cursor: "pointer", maxWidth: "400px" }} onClick={toggleCard}>
      {/* Collapsed View */}
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{move.name}</h5>
        <span className="badge bg-light border">{getRatingColor(rating)}</span>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="mt-3">
          <p>{move.description}</p>
          {move.gif && <img src={move.gif} alt={move.name} className="img-fluid rounded" style={{ maxHeight: "200px", objectFit: "cover" }} />}
          {/* {move.video && <video controls className="w-100 mt-2"><source src={move.video} type="video/mp4" /></video>} */}

          {/* Rating Selection */}
          <h6 className="mt-3">Rating:</h6>
          <div className="btn-group">
            {["Bad", "Ok", "Good"].map((r) => (
              <button
                key={r}
                className={`btn ${rating === r ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card collapse
                  handleRatingChange(r);
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Comments */}
          <h6 className="mt-2">Comments:</h6>
          <ul className="list-group">
            {move.comments.length > 0 ? (
              move.comments.map((comment, i) => <li key={i} className="list-group-item">{comment}</li>)
            ) : (
              <li className="list-group-item text-muted">No comments yet.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// Add PropTypes validation
MoveCard.propTypes = {
    move: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      gif: PropTypes.string,
      // video: PropTypes.string,
      comments: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    index: PropTypes.number.isRequired,
    updateMoveRating: PropTypes.func.isRequired,
  };