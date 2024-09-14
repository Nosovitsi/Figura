import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import AdminPanel from './components/AdminPanel';
import Register from './components/Register';

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <AdminPanel />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);




