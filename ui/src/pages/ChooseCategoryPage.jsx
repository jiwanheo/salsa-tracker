import React, { useEffect, useState } from 'react';
import Card from "../components/Cards/Card";
import CardsContainer from "../components/Cards/CardsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import BackButton from "../components/BackButton/BackButton";
import { useLocation, useNavigate } from 'react-router-dom';
import { getRandomImage } from "../utils/RandomImage";

export default function ChooseCategoryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const categoryType = queryParams.get('type');

    const [categories, setCategories] = useState([]);

    const getCategories = async (category_type) => {

        try {
            const url = new URL(`${import.meta.env.VITE_API_ENDPOINT}/categories`);
        
            if (category_type) {
                url.searchParams.append('category_type', category_type);  // Add category_type as a query parameter
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail);
            } else {
                // If the user was successfully created
                const responseData = await response.json();
                return responseData;
            }
        } catch (error) {
            // Handle any errors
            console.log(error.message);
            return [];
        }
    };

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