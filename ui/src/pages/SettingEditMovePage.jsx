import { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import RadioButton from "../components/RadioButton/RadioButton";
import MultiSelect from "../components/MultiSelect/MultiSelect";
import DropdownSelect from "../components/DropdownSelect/DropdownSelect";
import { useTopPageContext } from '../TopPageContext';
import { getCategories } from "../utils/getCategories";
import { getAllMovesIdName } from "../utils/getAllMovesIdName";
import { getMoveById } from "../utils/getMoveById";

export default function SettingEditMovePage() {
    const { setTopPageContextMessage } = useTopPageContext();
    const [allMoves, setAllMoves] = useState([]);
    const [selectedMoveId, setSelectedMoveId] = useState("");

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [newMoveCategories, setNewMoveCategories] = useState([]);

    const [newMoveName, setNewMoveName] = useState("");
    const [newMoveDescription, setNewMoveDescription] = useState("");
    const [newMoveVideo, setNewMoveVideo] = useState("");
    const [newMoveRating, setNewMoveRating] = useState(null);


    const fetchOneMove = async (move_id) => {
        try {
            const moveData = await getMoveById(move_id);
            const selected_categories = categoryOptions
                .map(group => group.items)
                .flat()
                .filter(item => moveData.move_category.includes(item.id))

            setNewMoveName(moveData.move_name);
            setNewMoveCategories(selected_categories)
            setNewMoveDescription(moveData.move_description);
            setNewMoveVideo(moveData.move_video);
            setNewMoveRating(moveData.move_rating);
        } catch (err) {
            console.log(err.message);
        }
    };

    // Populate options
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get move data (ID <-> Name pair)
                const movesData = await getAllMovesIdName();
                const moveChoices = movesData.map(move => ({
                    label: move.move_name,
                    value: move.move_id
                }));

                setAllMoves(moveChoices);


                // Get categories data
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


    // Upon selecting a move, populate the existing db info
    useEffect(() => {
        if (selectedMoveId) {
            fetchOneMove(selectedMoveId)
        }
    }, [selectedMoveId]);

    const handleEditMove = async (
        newMove, newMoveVideo, newMoveDescription, newMoveCategories, newMoveRating, 
        setNewMove, setNewMoveVideo, setNewMoveDescription, setNewMoveCategories, setNewMoveRating
    ) => {
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
            move_description: encodeURIComponent(newMoveDescription),
            move_categories: newMoveCategories_ids,
            move_rating: encodeURIComponent(newMoveRating)
        };

        try {
            // Send the PUT request
            const url = new URL(`${import.meta.env.VITE_API_ENDPOINT}/edit-move`, window.location.origin);
            url.searchParams.append('id', selectedMoveId); 

            const response = await fetch(url, {
              method: 'PUT',
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
              // If move was successfully edited
              const responseData = await response.json();
              setTopPageContextMessage({
                text: 'Move edited successfully!',
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
            setNewMoveDescription("");
            setNewMoveCategories([]);
            setNewMoveRating(null);
        }
    }

  return (
    <div className="main-container">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-5">
            Edit Move
        </h1>

        <DropdownSelect 
            label="Select a move to edit"
            choices={allMoves}
            onChange={setSelectedMoveId}
            placeholder="Select a move"
        />

        <span>Move Name</span>
        <input
            type="text"
            value={newMoveName}
            className="form-control"
            onChange={(e) => setNewMoveName(e.target.value)}
        />

        <span>Move Description</span>
        <textarea
            type="text"
            value={newMoveDescription}
            className="form-control"
            onChange={(e) => setNewMoveDescription(e.target.value)}
        />

        <span>Move Video ID</span>
        <input
            type="text"
            value={newMoveVideo}
            className="form-control"
            onChange={(e) => setNewMoveVideo(e.target.value)}
        />

        <span>Select Category(ies)</span>
        <MultiSelect 
            options={categoryOptions}
            newMoveCategories = {newMoveCategories}
            setNewMoveCategories = {setNewMoveCategories}
        />

        <span>Move Rating</span>
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
            label={"Edit Move"}
            onClick={() => handleEditMove(newMoveName, newMoveVideo, newMoveDescription, newMoveCategories, newMoveRating, setNewMoveName, setNewMoveVideo, setNewMoveDescription, setNewMoveCategories, setNewMoveRating)}
        />

      </div>
    </div>

  );
}
