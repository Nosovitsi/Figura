import React, { useState } from 'react';
import '../styles/RightColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; // Импортируйте компонент Modal

const RightColumn: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="right-column">
            <div className="right-column-content">
                <h2>Компания Пользователь</h2>
                <button className="button" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faBuilding} className="icon" /> Информация о компании
                </button>
            </div>
            <Modal show={isModalOpen} onClose={toggleModal}>
                <h2>Информация о компании</h2>
                <div className="company-info">
                    <div className="info-section">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
                        <div>
                            <h3>Адрес</h3>
                            <p>ул. Примерная, д. 10, г. Москва, Россия</p>
                        </div>
                    </div>
                    <div className="info-section">
                        <FontAwesomeIcon icon={faPhone} className="info-icon" />
                        <div>
                            <h3>Телефон</h3>
                            <p>+7 (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="info-section">
                        <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                        <div>
                            <h3>Email</h3>
                            <p>info@company.com</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RightColumn;


