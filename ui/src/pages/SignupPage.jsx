import { useState } from "react";
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import BackButton from "../components/BackButton/BackButton";

export default function LoginPage() {
    const [username, setUsername] = useState("");

    const handleSignup = async (username) => {

      const userData = {
        name: username
      };

      try {
        // Send the POST request
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(userData),
        });
  
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Parse the JSON response
        const responseData = await response.json();
        console.log(responseData)
  
      } catch (error) {
        // Handle any errors
        console.log(error.message);
      }
    };

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
            </TextInputContainer>
            <Button label="Sign up" onClick={() => handleSignup(username)} />
          </div>
        </div>
      );
}