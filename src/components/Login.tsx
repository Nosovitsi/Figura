import React, { useState, useEffect } from "react";
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

  // Слушаем ответ от сервера
  useEffect(() => {
    const handleServerResponse = (event: MessageEvent) => {
      const serverResponse = JSON.parse(event.data); // Получаем данные от сервера как строку
      // Проверяем ответ от сервера
      if (serverResponse.status === "200") {
        setSuccess("Вход успешен");
        setError("");
        // Сохраняем имя пользователя
        sessionStorage.setItem("userName", username);
        onLogin();
        navigate("/",{state: {userId:serverResponse.client_id}}); // Перенаправляем пользователя на главную страницу
      } else if (serverResponse.status === "403") {
        setError("Пользователь не существует");
        setSuccess("");
      }
    };

    if (window.ws) {
      window.ws.addEventListener('message', handleServerResponse);
    }

    // Убираем обработчик при размонтировании компонента
    return () => {
      if (window.ws) {
        window.ws.removeEventListener('message', handleServerResponse);
      }
    };
  }, [onLogin, navigate, username]); // Добавили username в зависимости

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!username || !password) {
      setError("Пожалуйста, введите имя пользователя и пароль");
      setSuccess("");
      return;
    }

    // Данные для отправки на сервер
    const loginData = {
      action: "login",
      user_name: username,
      password: password,
    };

    // Отправка данных через WebSocket
    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
      window.ws.send(JSON.stringify(loginData));
      setError("");
      setSuccess("Отправка данных...");
    } else {
      setError("Ошибка соединения с сервером");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h1>Личный кабинет</h1>
      <h3>Техническая поддержка</h3>
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

        <button type="submit" className="login-btn">Войти</button>
      </form>
    </div>
  );
};

export default Login;

















