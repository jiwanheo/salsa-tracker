import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/main");
  };
  
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-3">Sign in to JAST</h2>
      <TextInputContainer>
        <TextInput
          label="Username"
          name="username"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          label="Password"
          name="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          forgotPassword="true"
        />
      </TextInputContainer>
      <Button label="Sign in" onClick={handleLogin} />
      <Link to="/signup" className="jast-a mt-3">Sign up</Link>
    </div>
  );
}
