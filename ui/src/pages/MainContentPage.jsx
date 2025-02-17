import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MoveCards from "../components/MoveCards/MoveCards";
import CategoryScrollButtons from "../components/CategoryScrollButtons/CategoryScrollButtons";

export default function MainContentPage() {
  const [selectedCategoryType, setselectedCategoryType] = useState("Hands");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const handleSettings = () => {
    navigate("/settings");
  };

  const handsCategories = {
    "L - R": "Lead's left hand, follow's right hand",
    "L - L": "Lead's left hand, follow's left hand",
    "R - R": "Lead's right hand, follow's right hand",
    "R - L": "Lead's right hand, follow's left hand",
    "LR = RL": "Both hands (regular)",
    "LL X RR": "Hands crossed (lead's left on top)",
    "RR X LL": "Hands crossed (lead's right on top)"
  };

  const positionsCategories = {
    "crossbody": "Cross body lead",
    "hammerlock": "Hammerlock"
  };

  const moveData = {
    "L - L": [
      {
        name: "Double Left Hand Spin",
        description: "A spin where both partners keep left-hand connection, leading into a smooth turn.",
        gif: "https://placehold.co/200x150.gif",
        rating: 4,
        comments: ["Feels smooth when led properly", "Make sure to prep early"]
      },
      {
        name: "Left-Hand Wrap",
        description: "The lead wraps the follow’s left hand behind their back, setting up for an exit turn.",
        gif: "https://placehold.co/200x150.gif",
        rating: 3,
        comments: ["Careful not to over-rotate", "Keep frame tight"]
      }
    ],
    "R - R": [
      {
        name: "Right Hand Check Turn",
        description: "A controlled check turn with the right hand, leading into a cross-body exit.",
        gif: "https://placehold.co/200x150.gif",
        rating: 5,
        comments: ["Feels very natural", "Great for transitions"]
      },
      {
        name: "Right Hand Loop",
        description: "A looping motion over the follow’s head, transitioning into a hammerlock.",
        gif: "https://placehold.co/200x150.gif",
        rating: 2,
        comments: ["Takes practice to smooth out", "Don’t rush the loop"]
      }
    ]
  };

  // Choose the categories to display based on the selected option
  const categories = selectedCategoryType === "Hands" ? handsCategories : positionsCategories;

  const moves = selectedCategory ? moveData[selectedCategory] || [] : [];

  const updateMoveRating = (index, newRating) => {
    console.log(`Updating move ${index} to ${newRating}`);
    // Future: API call to update DB
  };

  

  return (
    <div className="d-flex flex-column align-items-center">
            
      <h2>View moves by:</h2>

      <div className="mt-3 d-flex gap-2">
        <button
          className={`btn ${selectedCategoryType === "Hands" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setselectedCategoryType("Hands");
            setSelectedCategory(null); // Reset selection when switching options
          }}
        >
          Hands
        </button>
        <button
          className={`btn ${selectedCategoryType === "Positions" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setselectedCategoryType("Positions");
            setSelectedCategory(null); // Reset selection when switching options
          }}
        >
          Positions
        </button>
      </div>

      {/* Scrollable Category Buttons */}
      <CategoryScrollButtons
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCategoryType={selectedCategoryType}
      />

      {/* Display Full Name of Selected Category */}
      {selectedCategory && (
        <h4 className="mt-3">{categories[selectedCategory]}</h4>
      )}

      {/* Move Cards */}
      <MoveCards moves={moves} updateMoveRating={updateMoveRating} />

      <button className="btn btn-primary mt-3" onClick={handleSettings}>
        Settings
      </button>

      {/* <AddEditPage/> */}
    </div>
  );
}
