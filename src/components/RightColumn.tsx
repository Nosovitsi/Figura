import React, { useState, useEffect } from 'react';
import '../styles/RightColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import {useLocation} from "react-router-dom"; // Импортируйте компонент Modal

interface CompanyInfo {
  company_name: string;
  address: string;
  phone: string;
  email: string;
}

const RightColumn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  const userName = 'test'; // Замените на реальное имя пользователя из login.tsx
  const location = useLocation();

  useEffect(() => {
    const fetchCompanyInfo = () => {
      const requestData = {
        action: 'GET_COMPANY_INFO',
        user_name: location.state.userId
      };
      const jsonString = JSON.stringify(requestData);

      if (window.ws && window.ws.readyState === WebSocket.OPEN) {
        window.ws.send(jsonString);
      } else {
        console.error('WebSocket не доступен');
      }
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.company_name) {
          setCompanyInfo({
            company_name: data.company_name,
            address: data.address,
            phone: data.phone,
            email: data.email
          })
        }
      } catch (error) {
        console.error('Ошибка при разборе JSON:', error);
      }
    };

    window.ws.addEventListener('message', handleMessage);

    if (isModalOpen) {
      fetchCompanyInfo();
    }

    return () => {
      window.ws.removeEventListener('message', handleMessage);
    };
  }, [isModalOpen, userName]);

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
        {companyInfo ? (
          <div className="company-info">
            <div className="info-section">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
              <div>
                <h3>Адрес</h3>
                <p>{companyInfo.address}</p>
              </div>
            </div>
            <div className="info-section">
              <FontAwesomeIcon icon={faPhone} className="info-icon" />
              <div>
                <h3>Телефон</h3>
                <p>{companyInfo.phone}</p>
              </div>
            </div>
            <div className="info-section">
              <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
              <div>
                <h3>Email</h3>
                <p>{companyInfo.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Загрузка информации...</p>
        )}
      </Modal>
    </div>
  );
};

export default RightColumn;



