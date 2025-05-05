import MoveCard from "../components/Cards/MoveCard";
import CardsContainer from "../components/Cards/CardsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import BackButton from "../components/BackButton/BackButton";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getMovesByCategory } from "../utils/getMovesByCategory";
import { getCategoryById } from "../utils/getCategoryById";

export default function ChooseMovePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const categoryType = queryParams.get('type');
    const category = queryParams.get('category');

    const [categoryName, setCategoryName] = useState([]);
    const [moves, setMoves] = useState([]);
    
    useEffect(() => {
        const fetchMovesData = async () => {
            const fetchedMoves = await getMovesByCategory(category);
            console.log(fetchedMoves)
            setMoves(fetchedMoves); 
        };
        fetchMovesData();

        const fetchCategoryName = async () => {
            const fetchedCategoryName = await getCategoryById(category);
            setCategoryName(fetchedCategoryName.category_name); 
        };
        fetchCategoryName();
    }, [category]);
    
    return (

        <div className="main-container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="mb-5">{categoryName}</h1>

                <CardsContainer 
                    cards={
                        <>
                            {moves.map((data, index) => (
                                <MoveCard 
                                    key={index}
                                    moveName={data.move_name} 
                                    moveDescription={data.move_description} 
                                    rating={data.move_rating} 
                                    video={data.move_video} 
                                />
                            ))}
                        </>   
                    }> 
                </CardsContainer>
            </div>
        </div>
    )
}
