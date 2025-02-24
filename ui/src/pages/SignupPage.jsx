import { useState } from "react";
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    return (
        <div className="d-flex flex-column align-items-center">
          <h2 className="mb-3">Sign up to JAST</h2>
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
            />
            <TextInput
              label="Re-type password"
              name="re-password"
              placeholder=""
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </TextInputContainer>
          <Button label="Sign up" onClick={() => alert(text)} widthClass="w-50" />
        </div>
      );
}