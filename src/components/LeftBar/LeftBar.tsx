import React from 'react';
import './LeftBar.css'; 

const LeftBar = () => {
    const handleSettingsClick = () => {
        console.log('Клик по кнопке "Настройки пользователя"');
    };

    return (
        <div className="left-bar">
            <h2>ТП Figura IT</h2>
            <p>Настройки профиля</p>
            <button onClick={handleSettingsClick}>Настройки пользователя</button>
        </div>
    );
}

export default LeftBar;

