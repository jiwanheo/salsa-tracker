import { useState } from "react";
import PropTypes from "prop-types";

export default function AddMoveForm({ categories, onAddMove }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [moveName, setMoveName] = useState("");
  const [moveDescription, setMoveDescription] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = () => {
    onAddMove(selectedCategory, moveName, moveDescription, rating);
  };

  return (
    <div>
      <h4>Add New Move</h4>
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control mt-2"
        value={moveName}
        onChange={(e) => setMoveName(e.target.value)}
        placeholder="Move name"
      />
      <textarea
        className="form-control mt-2"
        value={moveDescription}
        onChange={(e) => setMoveDescription(e.target.value)}
        placeholder="Move description"
      />
      <input
        type="number"
        className="form-control mt-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="Rating"
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Add Move
      </button>
    </div>
  );
}

AddMoveForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddMove: PropTypes.func.isRequired,
};
