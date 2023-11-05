import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

interface UserInputs {
  username: string;
  password: string;
}

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  // const dataInputFromUser = z.string().min(8).max(16);
  const UserDetails = z.object({
    username: z.string().email(),
    password: z.string().min(5),
  });

  const dataValidation = (input: unknown) => {
    return UserDetails.parse(input);
  };

  const handleSignup = async () => {
    //appling zod funcitonality for username and password
    // try {
    //   dataInputFromUser.parse(username);
    //   dataInputFromUser.parse(password);
    // } catch (err) {
    //   throw new Error(err);
    // }
    const inputData: UserInputs = { username, password };

    // try {
    //   dataValidation(inputData);
    // } catch (error) {
    //   console.error("Validation error:", error.message);
    //   return;
    // }

    // Make the API request
    if (dataValidation(inputData)) {
      try {
        const response = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: inputData.username,
            password: inputData.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Error while signing up");
        }

        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          navigation("/todos");
        } else {
          throw new Error("Token not received");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error during signup:", error.message);
        }
        alert("Error while signing up");
      }
    }
  };

  return (
    <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
      <div>
        <h2>Signup</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        Already signed up? <Link to="/login">Login</Link>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
