import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/Login.css';
import logo from '../assets/header-logo.svg';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "test" && password === "test") {
      onLogin();
      setSuccess("Вход успешен");
      setError("");
      alert("Вход успешен");
      navigate("/"); 
    } else {
      setError("Неверные имя пользователя или пароль");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="header-logo" />
      <h1>Вход</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;







