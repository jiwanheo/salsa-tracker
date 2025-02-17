import { useNavigate } from 'react-router-dom';
import AddEditForms from "../components/AddEditPage/AddEditForms";

export default function SettingsPage() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/main");
    };

    return (
        <div>
            <AddEditForms/>
            <button className="btn btn-primary mt-3" onClick={handleBack}>
                Back to main page
            </button>
        </div>
    )
}