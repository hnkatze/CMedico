import { Routes, Route, useLocation } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Consulta from "../pages/Consulta.jsx";
import HomePage from "../pages/HomePage.jsx";
import Inventor from "../pages/Inventor.jsx";
import InventorView from "../pages/InventorView.jsx";
import Consul from "../pages/Consul.jsx";
import Login from "../pages/login";
import { PrivateRouter } from "./PrivateRouter";

export const AppRoutes = () => {
  const { state } = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRouter Logged={state?.Logged} />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/Inventor" element={<Inventor />} />
      <Route path="/Inven" element={<InventorView />} />
      <Route path="/Consulta" element={<Consulta />} />
      <Route path="/Consulta/:id" element={<Consul />} />
      <Route path="*" element={<ErrorPage />} />
      <Route />
    </Routes>
  );
};
