import { useState } from "react";
import PropTypes from "prop-types";

export default function RenameCategoryForm({ categories, onRenameCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = () => {
    onRenameCategory(selectedCategory, newCategoryName);
  };

  return (
    <div>
      <h4>Rename Category</h4>
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
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="New category name"
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Rename Category
      </button>
    </div>
  );
}

RenameCategoryForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRenameCategory: PropTypes.func.isRequired,
};
