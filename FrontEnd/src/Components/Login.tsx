import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

interface UserData {
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Zod Schema creation
  const UserDetails = z.object({
    username: z.string().email(),
    password: z.string().min(5),
  });

  const validateUser = (input: UserData) => {
    return UserDetails.parse(input);
  };

  const handleLogin = async () => {
    const userInput: UserData = { username, password };
    try {
      if (validateUser(userInput)) {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/todos";
        } else {
          alert("invalid credentials");
        }
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
      <div>
        <h2>Login</h2>
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
        New here? <Link to="/signup">Signup</Link>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
