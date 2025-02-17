// src/components/AddCategoryForm.js
import { useState } from "react";
import PropTypes from "prop-types";

export default function AddCategoryForm({ onAddCategory }) {
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("Hands");

  const handleSubmit = () => {
    onAddCategory(newCategory, newCategoryType);
  };

  return (
    <div>
      <h4>Add New Category</h4>
      <input
        type="text"
        className="form-control"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category name"
      />
      <select
        className="form-select mt-2"
        value={newCategoryType}
        onChange={(e) => setNewCategoryType(e.target.value)}
      >
        <option value="Hands">Hands</option>
        <option value="Positions">Positions</option>
      </select>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Add Category
      </button>
    </div>
  );
}

AddCategoryForm.propTypes = {
    onAddCategory: PropTypes.func.isRequired,
  };
