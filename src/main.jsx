import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./Components/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
