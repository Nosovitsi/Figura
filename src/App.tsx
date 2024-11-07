import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";

const App: React.FC<{ onAuthenticate: () => void }> = ({ onAuthenticate }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const form = {
    "action": "registration",
    "user_name": "example@gmail.com",
    "password": "topsecret",
    "company_name": "ООО ХЛЕБ И ПИВО",
    "INN": "12345",
    "KPP": "12345",
    "address": "Москва, улица Красных Фонарей",
    "contact_user_name": "Александр",
    "contact_user_surname": "Конь",
    "phone_number":"+74955553535",
    "admin_keyword": "Effective_420"
  };

  const stringedForm = JSON.stringify(form);

  useEffect(() => {
    const newSocket = new WebSocket('ws://185.130.47.110:8686');
    setSocket(newSocket);
    window.ws = newSocket;
  
    return () => {
      // Cleanup function if needed
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      console.log("Соединение WebSocket открыто");
      // socket.send(stringedForm);
      // window.ws.send(stringedForm);
    };

    socket.onmessage = (event: MessageEvent) => {
      console.log("Сообщение от сервера WebSocket:", event.data);
    };

    socket.onerror = (error: Event) => {
      console.log("Ошибка WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("Соединение WebSocket закрыто");
    };
  }, [socket]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    onAuthenticate(); // Уведомляем родительский компонент о входе
  };

  return (
    <div className="App">
        <Layout />
    </div>
  );
};

export default App;











































