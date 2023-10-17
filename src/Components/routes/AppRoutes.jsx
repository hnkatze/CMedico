import { Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Consulta from "../pages/Consulta.jsx";
import HomePage from "../pages/HomePage.jsx";
import Inventor from "../pages/Inventor.jsx";
import InventorView from "../pages/InventorView.jsx";
import Consul from "../pages/Consul.jsx";
import Login from "../pages/login";
import { PrivateRouter } from "./PrivateRouter";
import { AuthProvider } from "./AuthProvider";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRouter />} />
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Inventor" element={<Inventor />} />
        <Route path="/Inven" element={<InventorView />} />
        <Route path="/Consulta" element={<Consulta />} />
        <Route path="/Consulta/:id" element={<Consul />} />
        <Route path="*" element={<ErrorPage />} />
        <Route />
      </Routes>
    </AuthProvider>
  );
};
