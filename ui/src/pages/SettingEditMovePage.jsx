import { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import DropdownSelect from "../components/DropdownSelect/DropdownSelect";
import { useTopPageContext } from '../TopPageContext';
import { getAllMovesIdName } from "../utils/getAllMovesIdName";

export default function SettingEditMovePage() {
    const { setTopPageContextMessage } = useTopPageContext();
    const [allMoves, setAllMoves] = useState([]);
    const [selectedMove, setSelectedMove] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movesData = await getAllMovesIdName();
                const moveChoices = movesData.map(move => ({
                    label: move.move_name,
                    value: move.move_id
                }));

                setAllMoves(moveChoices)
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, []);


    // Upon selecting a move, populate the existing db info
    useEffect(() => {
        if (selectedMove) {
            console.log(selectedMove)
        }
    }, [selectedMove]);

//   const [newCategoryType, setNewCategoryType] = useState("hands");

//   const handleAddCategory = async (newCategoryType, newCategory, setNewCategory) => {
//     if (newCategory == "") {
//       setTopPageContextMessage({
//         text: 'Category cannot be blank!',
//         type: 'error',
//       });
//       return;
//     }
//     const categoryData = {
//       category_type: encodeURIComponent(newCategoryType),
//       category_name: encodeURIComponent(newCategory)
//     };

//     try {
//       // Send the POST request
//       const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/create-category`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', 
//         },
//         body: JSON.stringify(categoryData),
//       });

//       // Check if the response is ok (status code 200-299)
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail);
//       } else {
//         // If the user was successfully created
//         const responseData = await response.json();
//         setTopPageContextMessage({
//           text: 'Category created successfully!',
//           type: 'success',
//         });
//       }
//     } catch (error) {
//       // Handle any errors
//       setTopPageContextMessage({
//         text: error.message,
//         type: 'error',
//       });
//     } finally {
//       setNewCategory("");  // Reset input in all cases
//     }
//   };

  return (
    <div className="main-container">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-5">
            Edit Move
        </h1>

        <DropdownSelect 
            label="Select a move to edit"
            choices={allMoves}
            onChange={setSelectedMove}
            placeholder="Select a move"
        />
        {/* <div className="w-100 big-radiobutton-container">
          <label className="form-label">Category Type</label>
          <div className="d-flex w-100 justify-content-center">
            <div 
              className={`w-100 big-radiobutton-container-choice ${newCategoryType == "hands" ? "selected": ""}`}
              onClick={(e) => setNewCategoryType("hands")}
            >
              Hands
            </div>
            <div 
              className={`w-100 big-radiobutton-container-choice ${newCategoryType == "positions" ? "selected": ""}`}
              onClick={(e) => setNewCategoryType("positions")}
            >              
              Positions
            </div>
          </div>
        </div>

        <input
          type="text"
          className="form-control"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        
        <Button 
          label={"Add Category"}
          onClick={() => handleAddCategory(newCategoryType, newCategory, setNewCategory)}
        /> */}
      </div>
    </div>

  );
}
