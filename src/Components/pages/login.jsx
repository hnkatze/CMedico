import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { message } from "antd";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkUser = async (data) => {
    try {
      const usersCollection = collection(db, "Users");
      const q = query(
        usersCollection,
        where("userName", "==", data.userName),
        where("password", "==", data.password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const userDoc = querySnapshot.docs[0];
        const userType = userDoc.data().userType;

        if (userType === 1 || userType === 2) {
          navigate("/Home", {
            replace: true,
            state: { Logged: true, userType },
          });
        }
      } else {
        message.open({
          type: "error",
          content: "Usuario o contraseña incorrectos",
        });
      }
    } catch (error) {
      console.error("Error al verificar el usuario:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      password: password,
    };

    checkUser(data);
  };

  return (
    <div className="login">
      <h1 className="title">Centro Médico Del Valle</h1>
      <h2 className="subtitle">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
