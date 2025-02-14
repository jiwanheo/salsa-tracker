import React, { useState, useEffect } from "react";

const categories = {
  "right-left": "Right Hand & Left Hand",
  "right-right": "Right Hand & Right Hand"
};

const App = () => {
  const [moves, setMoves] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    fetch("/moves.json")
      .then((res) => res.json())
      .then((data) => setMoves(data.categories));
  }, []);

  // Update rating
  const updateRating = (category, moveIndex, rating) => {
    setMoves((prevMoves) => {
      const updatedMoves = { ...prevMoves };
      updatedMoves[category] = [...updatedMoves[category]]; // Create a copy of the array
      updatedMoves[category][moveIndex] = {
        ...updatedMoves[category][moveIndex], // Copy the move object
        rating: rating, // Update the rating
      };
      return updatedMoves;
    });
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Jiwan&apos;s Awesome Salsa Tracker</h1>

      {/* Category Buttons */}
      <div className="d-flex gap-2 justify-content-center mb-4 overflow-auto">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className={`btn ${selectedCategory === key ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setSelectedCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Moves Grid */}
      <div className="row g-3">
        {moves[selectedCategory]?.map((move, index) => (
          <div key={index} className="col-sm-6 col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{move.name}</h5>
                <video className="w-100 rounded mt-2" controls>
                  <source src={move.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="mt-3 d-flex gap-2">
                  {["good", "ok", "bad"].map((rating) => (
                    <button
                      key={rating}
                      className={`btn ${move.rating === rating ? "btn-success" : "btn-outline-secondary"}`}
                      onClick={() => updateRating(selectedCategory, index, rating)}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
