import axios from "axios";
import { useState } from "react";
import apiRouters from "../utils/apiRouters";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function SignUp() {
  const { addInitial } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  function handleInput(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const { data } = await axios.post(apiRouters.signup, formData);
    const state = data.data.userObj;
    addInitial(state);
    navigate("/", { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleInput}
        />
      </div>
      <br />
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={handleInput}
        />
      </div>
      <br />
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handleInput}
        />
      </div>
      <br />
      <input type="submit" value="submit" />
    </form>
  );
}

export default SignUp;
