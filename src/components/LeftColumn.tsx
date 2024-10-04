import React, { useState } from 'react';
import '../styles/LeftColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faCog, faList } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const LeftColumn: React.FC = () => {
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
    const [isProfileSettingsModalOpen, setIsProfileSettingsModalOpen] = useState(false);

    const toggleEquipmentModal = () => {
        setIsEquipmentModalOpen(!isEquipmentModalOpen);
    };

    const toggleProfileSettingsModal = () => {
        setIsProfileSettingsModalOpen(!isProfileSettingsModalOpen);
    };

    return (
        <div className="left-column">
            <div className="left-column-content">
                <h2>Меню</h2>
                {/* <button className="button" onClick={toggleProfileSettingsModal}>
                    <FontAwesomeIcon icon={faCog} className="icon" /> Настройки профиля
                </button> */}
                <button className="button" onClick={toggleEquipmentModal}>
                    <FontAwesomeIcon icon={faList} className="icon" /> Список оборудования
                </button>
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
            <Modal show={isEquipmentModalOpen} onClose={toggleEquipmentModal}>
                <h2>Список оборудования</h2>
                <p>Здесь будет ваш список оборудования...</p>
            </Modal>
            <Modal show={isProfileSettingsModalOpen} onClose={toggleProfileSettingsModal}>
                <h2>Настройки профиля</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="save-button">Сохранить</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LeftColumn;











