import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Update from "./Components/Update";
import Pagenotfound from "./Components/Pagenotfound";
import Title from "./Components/Styledcomponents/Title";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Pagenotfound />,
    },
    {
      path: "/update/:userId",
      element: <Update />,
    },
  ]);
  return (
    <div>
      <Title primary>Crud</Title>

      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
