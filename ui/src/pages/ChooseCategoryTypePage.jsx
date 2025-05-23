import Card from "../components/Cards/Card";
import CardsContainer from "../components/Cards/CardsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import BackButton from "../components/BackButton/BackButton";
import { useNavigate } from 'react-router-dom';
import { getRandomImage } from "../utils/RandomImage";

export default function ChooseCategoryTypePage() {
    const navigate = useNavigate();

    const handleClickType = (type) => {
      navigate(`/category?type=${type}`);
    };

    return (

        <div className="main-container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="mb-5">View moves by:</h1>

                <CardsContainer 
                    cards={
                        <>
                            <Card
                                image={getRandomImage()}
                                textSection={
                                    <div className="text-start">
                                        <h2>Hands</h2>
                                        <p>7 hand positions</p>
                                    </div>
                                } 
                                onClick={() => handleClickType('hands')}
                            ></Card>

                            <Card
                                image={getRandomImage()}
                                textSection={
                                    <div className="text-start">
                                        <h2 className="text-lg font-bold">Positions</h2>
                                        <p className="text-gray-600">Variations from base positions</p>
                                    </div>
                                } 
                                onClick={() => handleClickType('positions')}
                            ></Card>
                        </>   
                    }> 
                </CardsContainer>
            </div>
        </div>
    )
}