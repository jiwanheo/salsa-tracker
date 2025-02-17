import { useState } from "react";
import PropTypes from "prop-types";

export default function EditMoveForm({ moves, onEditMove }) {
  const [selectedMove, setSelectedMove] = useState("");
  const [selectedFieldToEdit, setSelectedFieldToEdit] = useState("");
  const [editedFieldValue, setEditedFieldValue] = useState("");

  const handleSubmit = () => {
    onEditMove(selectedMove, selectedFieldToEdit, editedFieldValue);
  };

  return (
    <div>
      <h4>Edit Move</h4>
      <select
        className="form-select"
        value={selectedMove}
        onChange={(e) => setSelectedMove(e.target.value)}
      >
        <option value="">Select Move</option>
        {moves.map((move, index) => (
          <option key={index} value={move.name}>
            {move.name}
          </option>
        ))}
      </select>
      <select
        className="form-select mt-2"
        value={selectedFieldToEdit}
        onChange={(e) => setSelectedFieldToEdit(e.target.value)}
      >
        <option value="">Select Field to Edit</option>
        <option value="name">Move Name</option>
        <option value="description">Description</option>
        <option value="rating">Rating</option>
      </select>
      <input
        type="text"
        className="form-control mt-2"
        value={editedFieldValue}
        onChange={(e) => setEditedFieldValue(e.target.value)}
        placeholder="New value"
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Edit Move
      </button>
    </div>
  );
}

EditMoveForm.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEditMove: PropTypes.func.isRequired,
};
