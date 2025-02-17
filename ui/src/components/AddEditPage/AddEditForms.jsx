import { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import RenameCategoryForm from "./RenameCategoryForm";
import AddMoveForm from "./AddMoveForm";
import EditMoveForm from "./EditMoveForm";
import PropTypes from "prop-types";

export default function AddEditForms() {
  const [activeTab, setActiveTab] = useState("add-category");

  // Fake data for testing
  const handsCategories = ["L - L", "L - R", "R - R", "R - L"];
  const positionsCategories = ["crossbody", "hammerlock"];
  const moveData = {
    "L - L": [{ name: "Double Left Hand Spin", description: "Spin", rating: 4 }],
    "R - R": [{ name: "Right Hand Check Turn", description: "Turn", rating: 5 }],
  };

  // Functions to handle form submissions
  const handleAddCategory = (categoryName, categoryType) => {
    console.log(`Adding new category: ${categoryName} under ${categoryType}`);
  };

  const handleRenameCategory = (oldCategory, newCategory) => {
    console.log(`Renaming ${oldCategory} to ${newCategory}`);
  };

  const handleAddMove = (category, name, description, rating) => {
    console.log(`Adding move to ${category}: ${name}. ${description}, ${rating}`);
  };

  const handleEditMove = (moveName, field, newValue) => {
    console.log(`Editing ${moveName} - ${field} to ${newValue}`);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "add-category" ? "active" : ""}`}
            onClick={() => setActiveTab("add-category")}
          >
            Add Category
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "rename-category" ? "active" : ""}`}
            onClick={() => setActiveTab("rename-category")}
          >
            Rename Category
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "add-move" ? "active" : ""}`}
            onClick={() => setActiveTab("add-move")}
          >
            Add Move
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "edit-move" ? "active" : ""}`}
            onClick={() => setActiveTab("edit-move")}
          >
            Edit Move
          </a>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {activeTab === "add-category" && (
          <AddCategoryForm onAddCategory={handleAddCategory} />
        )}
        {activeTab === "rename-category" && (
          <RenameCategoryForm categories={handsCategories.concat(positionsCategories)} onRenameCategory={handleRenameCategory} />
        )}
        {activeTab === "add-move" && (
          <AddMoveForm categories={handsCategories.concat(positionsCategories)} onAddMove={handleAddMove} />
        )}
        {activeTab === "edit-move" && (
          <EditMoveForm moves={moveData["L - L"]} onEditMove={handleEditMove} />
        )}
      </div>
    </div>
  );
}

AddEditForms.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};