import React, { FC } from "react";
import '../styles/OrganizationModal.css'

interface OrganizationModalProps {
  organizations: Array<string[]>;
  onClose: () => void;
}

const OrganizationModal: FC<OrganizationModalProps> = ({ organizations, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Список оборудования</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        <div className="modal-body">
          <span>Введите серийный номер:</span>
          <input type="text"/>
          {organizations.length > 0 ? (
            <ul className="organization-list">
              {organizations.map((org) => (
                  <li key={org[3]} className="organization-item">
                    <div className="organization-list-data">
                      <div><span>Оборудование: </span><span>{org[1]}</span></div>
                      <div><span>Серийный номер: </span><span>{org[2]}</span></div>
                      <span>{org[0]}</span>

                      </div>

                  </li>
              ))}
            </ul>
          ) : (
              <p>Нет доступного оборудования</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationModal;




