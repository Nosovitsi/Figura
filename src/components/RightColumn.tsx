import React from 'react';
import '../styles/RightColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const RightColumn: React.FC = () => {
    return (
        <div className="right-column">
            <div className="right-column-content">
                <h2>Компания Пользователь</h2>
                <button className="button">
                    <FontAwesomeIcon icon={faBuilding} className="icon" /> Информация о компании
                </button>
                {}
            </div>
        </div>
    );
};

export default RightColumn;
