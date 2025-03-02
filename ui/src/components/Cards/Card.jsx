import "./Card.css"

const Card = ({ image, textSection, onClick }) => {
    return (
        <div className={`card jast-card jast-normal-card shadow-sm`} onClick={onClick}>
            {image && (
                <div className="card-image-container">
                    <img src={image} alt="Card" className="card-img" />
                </div>
            )}
            <div className={`card-body`}>
                {textSection}
            </div>
        </div>
    );
};

export default Card;
