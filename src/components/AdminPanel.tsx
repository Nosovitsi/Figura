import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css';

const AdminPanel: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h1>Личный кабинет</h1>
            <div className="company-info">
                <h2>О компании</h2>
                <p>Наша компания занимается разработкой программного обеспечения, предоставляя высококачественные решения для бизнеса.</p>
                <h3>Наши услуги:</h3>
                <ul>
                    <li>Разработка веб-приложений</li>
                    <li>Мобильные приложения</li>
                    <li>Консультации по IT</li>
                    <li>Поддержка и обслуживание</li>
                </ul>
                <h3>Контактная информация:</h3>
                <p>Email: info@company.com</p>
                <p>Телефон: +7 (123) 456-78-90</p>
            </div>
            <Link to={'/'} className="back-link">Вернуться на главную</Link>
        </div>
    );
};

export default AdminPanel;

