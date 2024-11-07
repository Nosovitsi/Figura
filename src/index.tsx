import React, { useState, useEffect } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdminPanel from "./components/AdminPanel";
import Register from "./components/Register";
import Login from "./components/Login";
import PasswordManage from "./components/PasswordManage"; // Импортируем компонент

declare global {
    interface Window { ws: any; }
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Создаем WebSocket при первом запуске приложения
  useEffect(() => {
    const newSocket = new WebSocket('ws://185.130.47.110:8686');
    setSocket(newSocket);
    window.ws = newSocket; // Делаем WebSocket доступным глобально

    newSocket.onopen = () => {
      console.log("Соединение WebSocket открыто в Index.tsx");
    };

    newSocket.onmessage = (event: MessageEvent) => {
      console.log("Сообщение от сервера WebSocket:", event.data);
    };

    newSocket.onerror = (error: Event) => {
      console.log("Ошибка WebSocket:", error);
    };

    newSocket.onclose = () => {
      console.log("Соединение WebSocket закрыто");
    };

    return () => {
      // newSocket.close(); // Закрываем соединение при размонтировании компонента
    };
  }, []);

  const router = createHashRouter([
    {
      path: "/",
      element: (
        isAuthenticated ? <App onAuthenticate={() => setIsAuthenticated(true)} /> : <Navigate to="/login" replace />
      ),
    },
    {
      path: "/admin",
      element: <AdminPanel />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login onLogin={() => setIsAuthenticated(true)} />,
    },
    {
      path: "/manage",
      element: <PasswordManage />,
    },
    {
      path: "*",
      element: <div>404 - Страница не найдена</div>, // Обработка 404
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);














