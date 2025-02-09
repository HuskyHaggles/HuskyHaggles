import { useState } from "react";
import LoginButton from "./buttons/LoginButton";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = () => {
    if (email && password) {
      console.log("Successful login");
    } else {
      console.log("Please enter both email and password");
    }
  };

  return (
    <div id="login-screen">
      <h1>Log in</h1>
      <input
        id="username"
        placeholder="username"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        placeholder="password"
        type="password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton onClick={formSubmit}>Login</LoginButton>
    </div>
  );
};

export default LoginForm;

