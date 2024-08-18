import React, { useState } from 'react';
import '../styles/RightColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; 

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
                <p>Здесь будет отображаться информация о компании...</p>
            </Modal>
        </div>
    );
};

export default RightColumn;

