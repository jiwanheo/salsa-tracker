import { useState, useRef, useEffect } from "react";
// import PropTypes from "prop-types";
import MultiSelect from "../components/MultiSelect/MultiSelect";
import Button from "../components/Button/Button";
import RadioButton from "../components/RadioButton/RadioButton";
import { getCategories } from "../utils/getCategories";
import { useTopPageContext } from '../TopPageContext';

export default function SettingAddMovePage() {
    const { setTopPageContextMessage } = useTopPageContext();

    const [newMove, setNewMove] = useState("");
    const [newMoveVideo, setNewMoveVideo] = useState("");
    const [newMoveCategories, setNewMoveCategories] = useState([]);
    const [newMoveRating, setNewMoveRating] = useState(null);

    const [categoryOptions, setCategoryOptions] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both categories simultaneously
                const [handsData, positionsData] = await Promise.all([
                    getCategories("hands"),
                    getCategories("positions"),
                ]);
        
                // Merge and format data
                const combinedData = [...handsData, ...positionsData];
        
                const formattedCategories = {};
                combinedData.forEach((item) => {
                if (!formattedCategories[item.category_type]) {
                    formattedCategories[item.category_type] = [];
                }
                formattedCategories[item.category_type].push({
                    id: item.category_id,
                    name: item.category_name,
                  });
                });
        
                // Convert object to array format
                const categoryArray = Object.keys(formattedCategories).map((key) => ({
                    category: key,
                    items: formattedCategories[key],
                }));

                setCategoryOptions(categoryArray);
            } catch (err) {
                console.log(err.message);
            }
        };
    
        fetchData();
    }, []);

    const handleAddMove = async (newMove, newMoveVideo, newMoveCategories, newMoveRating, setNewMove, setNewMoveVideo, setNewMoveCategories, setNewMoveRating) => {
        if (newMove == "") {
            setTopPageContextMessage({
              text: 'Move cannot be blank!',
              type: 'error',
            });
            return;
        }

        if (newMoveCategories.length == 0) {
            setTopPageContextMessage({
              text: 'Move must have at least 1 category!',
              type: 'error',
            });
            return;
        }

        if (newMoveRating == null) {
            setTopPageContextMessage({
              text: 'Move must have a rating!',
              type: 'error',
            });
            return;
        }

        const newMoveCategories_ids = newMoveCategories.map(item => item.id); 
        const moveData = {
            move_name: encodeURIComponent(newMove),
            move_video: encodeURIComponent(newMoveVideo),
            move_categories: encodeURIComponent(JSON.stringify(newMoveCategories_ids)),
            move_rating: encodeURIComponent(newMoveRating)
        };

        console.log(moveData)

        try {
            console.log("hi")
            // Send the POST request
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/create-move`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify(moveData),
            });
      
            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.detail);
            } else {
              // If the user was successfully created
              const responseData = await response.json();
              setTopPageContextMessage({
                text: 'Move created successfully!',
                type: 'success',
              });
            }
        } catch (error) {
            // Handle any errors
            setTopPageContextMessage({
                text: error.message,
                type: 'error',
            });
        } finally {
            setNewMove("");
            setNewMoveVideo("");
            setNewMoveCategories([]);
            setNewMoveRating(null);
        }
    }

    return (
        <div className="main-container">
            <div className="d-flex flex-column align-items-center">
                <h1 className="mb-5">
                    Add New Move
                </h1>

                <input
                    type="text"
                    className="form-control"
                    value={newMove}
                    onChange={(e) => setNewMove(e.target.value)}
                    placeholder="New move name"
                />

                <input
                    type="text"
                    className="form-control"
                    value={newMoveVideo}
                    onChange={(e) => setNewMoveVideo(e.target.value)}
                    placeholder="New move video URL"
                />

                <span>Select Category(ies)</span>
                <MultiSelect 
                    options={categoryOptions}
                    newMoveCategories = {newMoveCategories}
                    setNewMoveCategories = {setNewMoveCategories}
                />

                <RadioButton 
                    label = "Rating"
                    options = {
                        [
                            { value: "good", label: "Good" },
                            { value: "ok", label: "OK" },
                            { value: "bad", label: "Bad" },
                        ]
                    }
                    newMoveRating = {newMoveRating}
                    setNewMoveRating = { setNewMoveRating }
                />

                <Button 
                    label={"Add Move"}
                    onClick={() => handleAddMove(newMove, newMoveVideo, newMoveCategories, newMoveRating, setNewMove, setNewMoveVideo, setNewMoveCategories, setNewMoveRating)}
                />
            </div>
        </div>
    )
}