import PropTypes from "prop-types"; // Import PropTypes
import MoveCard from "./MoveCard";

export default function MoveCards({ moves, updateMoveRating }) {
  return (
    <div className="d-flex flex-column gap-3 mt-3 w-100">
      {moves.map((move, index) => (
        <MoveCard key={index} move={move} index={index} updateMoveRating={updateMoveRating} />
      ))}
    </div>
  );
}

// Add PropTypes validation
// We'd probably want to take only gif or video
MoveCards.propTypes = {
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        gif: PropTypes.string,
        // video: PropTypes.string,
        comments: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    updateMoveRating: PropTypes.func.isRequired,
  };