import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "test" && password === "test") {
      onLogin();
      alert("Вход успешен");
      navigate("/"); // Перенаправляем на главную страницу
    } else {
      setError("Неверные имя пользователя или пароль");
    }
  };

  return (
    <div className="login-container">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;




