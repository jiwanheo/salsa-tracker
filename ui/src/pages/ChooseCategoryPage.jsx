import React, { useEffect, useState } from 'react';
import Card from "../components/Cards/Card";
import CardsContainer from "../components/Cards/CardsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import BackButton from "../components/BackButton/BackButton";
import { getCategories } from '../utils/getCategories';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRandomImage } from "../utils/RandomImage";

export default function ChooseCategoryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const categoryType = queryParams.get('type');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            const fetchedCategories = await getCategories(categoryType)

            setCategories(fetchedCategories); 
        };

        fetchCategoriesData();
    }, [categoryType]);

    const handleClickCategory = (category) => {
        navigate(`/move?type=${categoryType}&category=${category}`);
    };

    // Need a function to break up the text
    const category_array = categories.map(category => ({
        ...category,
        image: getRandomImage()
    }))

    return (
        <div className="main-container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="mb-5">
                    <span style={{ textTransform: 'capitalize' }}>{categoryType}</span>
                    <span> category</span>
                </h1>

                <CardsContainer 
                    cards={
                        <>
                            {category_array.map((data, index) => (
                                <Card 
                                    key={index} 
                                    image={data.image} 
                                    textSection={data.category_name} 
                                    onClick={() => handleClickCategory(data.category_id)}
                                />
                            ))}
                        </>   
                    }> 
                </CardsContainer>
            </div>
        </div>
    )
}