import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function RootElement() {
  const { auth } = useAuth();
  return (
    <>
      <header>
        <h2>Blogify</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Add Blog</NavLink>
            </li>
            {!auth && (
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
            )}
            {!auth && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {auth && (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootElement;
