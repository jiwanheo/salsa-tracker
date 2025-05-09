import { useState } from "react";
import { TextInput, TextInputContainer } from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import BackButton from "../components/BackButton/BackButton";
import { useTopPageContext } from '../TopPageContext';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const { setTopPageContextMessage } = useTopPageContext();

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
          const errorData = await response.json();
          // If the error is a "Username already exists" error
          if (response.status === 400 && errorData.detail === "Username already exists") {
            // Update context for user exists error
            setTopPageContextMessage({
              text: 'Username already exists. Please try a different one.',
              type: 'error',
            });
          } else {
            throw new Error(errorData.detail);
          }
        } else {
          // If the user was successfully created
          const responseData = await response.json();
          console.log(responseData);
          setTopPageContextMessage({
            text: 'User created successfully!',
            type: 'success',
          });
        }
      } catch (error) {
        // Handle any errors
        console.log(error.message);
      }
    };

    return (

        <div className="main-container">
          <div className="d-flex flex-column align-items-center">
          
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