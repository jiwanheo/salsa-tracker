import CategoryScrollButton from './CategoryScrollButton';
import PropTypes from 'prop-types';

const getColoredText = (key) => {
  const split_key = (key.split(/(\s*[-X=]\s*)/))
  
  // If first part is length 1, there's only 1 hand
  if (split_key[0].length == 1) {
    return(
      <>
        <span className="blue">{split_key[0]}</span>
        <span className="separator">{split_key[1]}</span>
        <span className="red">{split_key[2]}</span>
      </>
    )
  } else {
    return (
      <>
        <span className="blue">{split_key[0][0]}</span>
        <span className="red">{split_key[0][1]}</span>
        <span className="separator">{split_key[1]}</span>
        <span className="blue">{split_key[2][0]}</span>
        <span className="red">{split_key[2][1]}</span>
      </>
    );
  }
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
