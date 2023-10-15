import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/pages/ErrorPage";
import Consulta from "./Components/pages/Consulta.jsx";
import HomePage from "./Components/pages/HomePage.jsx";
import Inventor from "./Components/pages/Inventor.jsx";
import Consul from "./Components/pages/Consul.jsx";
import Login from "./Components/pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/Inventor",
    element: <Inventor />,
  },

  {
    path: "/Consulta",
    element: <Consulta />,
  },
  {
    path: "/Consulta/:id",
    element: <Consul />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
