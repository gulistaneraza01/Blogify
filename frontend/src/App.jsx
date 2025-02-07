import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootElement from "./layouts/RootElement";
import { Home, AddBlog, Error, SignUp, Login, Logout } from "./pages";
import Required from "./utils/Required";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootElement />}>
      <Route index element={<Home />}></Route>
      <Route
        path="/blog"
        element={
          <Required>
            <AddBlog />
          </Required>
        }
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
