import axios from "axios";
import { useState } from "react";
import apiRouters from "../utils/apiRouters";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { addInitial } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function handleInput(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const toRedirect = location.state?.toRedirect || "/";
  async function handleSubmit(e) {
    e.preventDefault();
    const { data } = await axios.post(apiRouters.login, formData);
    const state = data.data.userObj;
    addInitial(state);
    navigate(toRedirect, { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={handleInput}
          value={email}
        />
      </div>
      <br />
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleInput}
          value={password}
        />
      </div>
      <br />
      <input type="submit" value="submit" />
    </form>
  );
}

export default Login;
