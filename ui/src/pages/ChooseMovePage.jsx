import MoveCard from "../components/Cards/MoveCard";
import CardsContainer from "../components/Cards/CardsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import BackButton from "../components/BackButton/BackButton";
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChooseMovePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const categoryType = queryParams.get('type');
    const category = queryParams.get('category');

    // This would eventually be a DB call
    const translations = {
        'lead-left-follow-right': "Lead's left <-> Follow's right",
        'another-category': "Another translation",
    };

    const categoryInEnglish = translations[category]
    
    const cardData = [
        {
            moveName: "Left turn (follow)", 
            moveDescription: "The Lead initiates by raising their left hand slightly and guiding the Follow into a counterclockwise turn under the arm.",
            rating: "Good",
            anotherText: "hihihihi",
            video: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        },
        {
            moveName: "Reverse Crossbody Lead with Inside Turn", 
            moveDescription: "The Lead initiates an inside turn (left turn) for the Follow, then guides them into a Crossbody Lead while maintaining connection. As the Follow crosses, the Lead preps and leads a second inside turn",
            rating: "OK",
            anotherText: "hihihihi",
            video: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
        },
    ];

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="top-nav mb-5">
                <ProgressBar progress={3}/>
                <BackButton text={ `${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1)} category` } to={`/category?type=${categoryType}`}/>
            </div>

             <h1 className="mb-5">{categoryInEnglish}</h1>

            <CardsContainer 
                cards={
                    <>
                        {cardData.map((data, index) => (
                            <MoveCard 
                                key={index}
                                moveName={data.moveName} 
                                moveDescription={data.moveDescription} 
                                rating={data.rating} 
                                anotherText={data.anotherText} 
                                video={data.video} 
                            />
                        ))}
                    </>   
                }> 
            </CardsContainer>
        </div>
    )
}
