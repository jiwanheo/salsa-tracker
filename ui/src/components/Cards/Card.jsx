import "./Card.css"

const Card = ({ image, textSection }) => {
    return (
        <div className={`card jast-card shadow-sm`}>
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
