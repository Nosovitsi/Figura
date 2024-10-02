import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";

const App: React.FC<{ onAuthenticate: () => void }> = ({ onAuthenticate }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = new WebSocket('ws://199.231.235.94:8686');
    setSocket(newSocket);
  
    return () => {
      console.log("Закрытие соединения WebSocket");
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      console.log("Соединение WebSocket открыто");
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































