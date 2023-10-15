// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "../css/login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      window.location.search.includes("username") &&
      window.location.search.includes("password")
    ) {
      const params = new URLSearchParams(window.location.search);
      setUsername(params.get("username"));
      setPassword(params.get("password"));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/";
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <div className="login">
      <h1>Centro Medico</h1>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
