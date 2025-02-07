import axios from "axios";
import apiRouters from "../utils/apiRouters";
import { useAuth } from "../context/AuthProvider";

function Logout() {
  const { removeInitial } = useAuth();
  async function handleLogout() {
    const { data } = await axios.post(apiRouters.logout);
    removeInitial();
  }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Logout;
