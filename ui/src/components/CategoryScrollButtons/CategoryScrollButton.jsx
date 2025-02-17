import PropTypes from 'prop-types';

const CategoryScrollButton = ({ category, isSelected, onClick, renderCategoryText }) => {
  return (
    <button
      className={`btn ${isSelected ? "btn-primary" : "btn-outline-secondary"}`}
      onClick={onClick}
    >
      {renderCategoryText(category)}
    </button>
  );
};

CategoryScrollButton.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  renderCategoryText: PropTypes.func.isRequired,
};

export default CategoryScrollButton;
