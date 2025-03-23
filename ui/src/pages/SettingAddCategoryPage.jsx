import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../components/Button/Button";


export default function SettingAddCategoryPage() {
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("Hands");

  const handleAddCategory = () => {
    console.log(`Adding new category: ${newCategory} under ${newCategoryType}`);
  };

  return (
    <div className="main-container">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-5">
            Add New Category
        </h1>

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
        <Button 
          label={"Add Category"}
          onClick={() => handleAddCategory}
        />
      </div>
    </div>

  );
}

SettingAddCategoryPage.propTypes = {
    onAddCategory: PropTypes.func.isRequired,
  };
