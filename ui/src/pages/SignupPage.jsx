import { useState } from "react";
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import BackButton from "../components/BackButton/BackButton";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    return (

        <div className="main-container">
          <div className="d-flex flex-column align-items-center">
          
            <div className="top-nav mb-5">
                <BackButton text={"Sign in"} to={"/"}/>
            </div>

            <h1 className="mb-3">Sign up to JAST</h1>

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
              />
              <TextInput
                label="Re-type password"
                name="re-password"
                placeholder=""
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              /> */}
            </TextInputContainer>
            <Button label="Sign up" onClick={() => alert(text)} widthClass="w-50" />
          </div>
        </div>
      );
}