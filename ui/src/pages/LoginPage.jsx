import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedUser) {
      // Redirect to the main page upon successful login
      navigate("/main");
    } else {
      alert("Please select a user.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Login</h2>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="form-select"
        style={{ maxWidth: "300px" }}
      >
        <option value="">Select a user</option>
        <option value="Jiwan">Jiwan</option>
        <option value="G-Money">G-Money</option>
      </select>
      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
