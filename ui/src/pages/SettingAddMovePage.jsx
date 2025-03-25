import { useState, useRef, useEffect } from "react";
// import PropTypes from "prop-types";
import MultiSelect from "../components/MultiSelect/MultiSelect";
import Button from "../components/Button/Button";
import { getCategories } from "../utils/getCategories";
import { useTopPageContext } from '../TopPageContext';

export default function SettingAddMovePage() {
    const { setTopPageContextMessage } = useTopPageContext();

    const [newMove, setNewMove] = useState("");
    const [multiselectOptions, setMultiselectOptions] = useState([]);
    const [newMoveRating, setNewMoveRating] = useState("");

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

                setMultiselectOptions(categoryArray);
            } catch (err) {
                console.log(err.message);
            }
        };
    
        fetchData();
    }, []);

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

                <span>Select Category(ies)</span>
                <MultiSelect 
                    options={multiselectOptions}
                />

                <input
                    type="text"
                    className="form-control"
                    value={newMoveRating}
                    onChange={(e) => setNewMoveRating(e.target.value)}
                    placeholder="Rating"
                />
            </div>
        </div>
    )
}