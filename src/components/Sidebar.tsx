import React from 'react';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>Обращения</li>
                    <li>Отчеты</li>
                    <li>Дашборды</li>
                    <li>Список оборудования</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;


