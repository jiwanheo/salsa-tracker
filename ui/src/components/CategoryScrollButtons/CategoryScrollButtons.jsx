import CategoryScrollButton from './CategoryScrollButton';
import PropTypes from 'prop-types';

// Colouring Hands category
const getColoredText = (key) => {
  return key.split(/(\s*[=X-]\s*)/).map((part, index) => {
      if (part === "L" || part === "LR" || part === "LL") {
      return <span key={index} className="blue">{part}</span>;
      } 
      if (part === "R" || part === "RL" || part === "RR") {
      return <span key={index} className="red">{part}</span>;
      } 
      return <span key={index}>{part}</span>;
  });
};

const CategoryScrollButtons = ({ categories, selectedCategory, setSelectedCategory, selectedCategoryType }) => {
  return (
    <div
      className="mt-3 d-flex gap-2 overflow-auto w-100"
      style={{
        whiteSpace: "nowrap",
        overflowX: "auto",
        scrollbarWidth: "thin",
        maxWidth: "400px", // Adjust width as needed
      }}
    >
      {Object.keys(categories).map((key) => (
        <CategoryScrollButton
          key={key}
          category={key}
          isSelected={selectedCategory === key}
          onClick={() => setSelectedCategory(key)}
          renderCategoryText={selectedCategoryType === "Hands" ? getColoredText : (text) => categories[text]}
        />
      ))}
    </div>
  );
};

// PropTypes for CategoryButtons component
CategoryScrollButtons.propTypes = {
    categories: PropTypes.object.isRequired, // Expecting an object for categories
    selectedCategory: PropTypes.string, // The currently selected category (optional)
    setSelectedCategory: PropTypes.func.isRequired, // Function to update the selected category
    selectedCategoryType: PropTypes.string.isRequired, // The selected option, "Hands" or "Positions"
};

export default CategoryScrollButtons;
