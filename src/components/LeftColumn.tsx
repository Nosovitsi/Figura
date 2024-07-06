import React from 'react';
import '../styles/LeftColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faCog, faList } from '@fortawesome/free-solid-svg-icons';

const LeftColumn: React.FC = () => {
    return (
        <div className="left-column">
            <div className="left-column-content">
                <h2>Меню</h2>
                <button className="button">
                    <FontAwesomeIcon icon={faCog} className="icon" /> Настройки профиля
                </button>
                <button className="button">
                    <FontAwesomeIcon icon={faList} className="icon" /> Список оборудования
                </button>
                {}
            </div>
            <div className="contact-links">
                <h3>Контакты:</h3>
                <ul>
                    <li>
                        <a href="https://t.me/yourbot" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTelegramPlane} className="icon" /> Telegram Bot
                        </a>
                    </li>
                    <li>
                        <a href="mailto:support@yourdomain.com">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" /> Email SD
                        </a>
                    </li>
                    <li>
                        <a href="tel:+1234567890">
                            <FontAwesomeIcon icon={faPhone} className="icon" /> Телефонная поддержка
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LeftColumn;








