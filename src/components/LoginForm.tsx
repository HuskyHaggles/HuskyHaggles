import { useState } from "react";
import LoginButton from "./buttons/LoginButton";
    const LoginForm: React.FC = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const formSubmit = () => {
            if(email && password != null){
                console.log("Successful login")
            }
        }
    };
    return (
      <div id="login-screen">
        <h1>Log in</h1>
        <input
          id="username"
          placeholder="username"
          className="input-field"
        />
        <input
          id="password"
          placeholder="password"
          type="password"
          className="input-field"
        />
        <LoginButton children={submitForm}></LoginButton>

      </div>
    );
    export default LoginForm;
  
  
