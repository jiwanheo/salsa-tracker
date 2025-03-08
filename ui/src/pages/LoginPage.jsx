import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../UserContext';  // Use the custom hook
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import { useTopPageContext } from '../TopPageContext';  // import the hook

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();
  const { setTopPageContextMessage } = useTopPageContext();

  const handleLogin = (username) => {

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/user-exists?user_name=${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data["exists"]) {
          login(username)
          navigate("/category-type");
        } else {
          setTopPageContextMessage({text: "We couldn't find an account matching the username you entered. Please check your username and try again.", type: 'error'});
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
