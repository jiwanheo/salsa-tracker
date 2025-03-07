import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../UserContext';  // Use the custom hook
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";

export default function LoginPage({ setUserExists }) {
  const [username, setUsername] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (username) => {

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/user-exists?user_name=${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data["exists"]) {
          setUserExists(true) 
          login(username)
          navigate("/category-type");
        } else {
          // This shows the user doesn't exist warning at the top
          setUserExists(false)
        }
      })
      .catch((err) => console.error("Error:", err));
  };
  
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="main-container">
      <div className="d-flex flex-column align-items-center">
        <h1 className="mb-5">Sign in to JAST</h1>
        <TextInputContainer>
          <TextInput
            label="Username"
            name="username"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <TextInput
            label="Password"
            name="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            forgotPassword="true"
          /> */}
        </TextInputContainer>

        <Button label="Sign in" onClick={() => handleLogin(username)} />
        <Link to="/signup" className="jast-a mt-3">Sign up</Link>
      </div>
    </div>
  );
}
