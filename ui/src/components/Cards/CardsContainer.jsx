import "./CardsContainer.css"

const CardsContainer = ({ cards }) => {
    return (
        <div className={`jast-card-container`}>
            {cards}
        </div>
    );
};

export default CardsContainer;
