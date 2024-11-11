import React, { FC } from "react";
import { Organization } from "./types"; // Импорт типов, если они у вас есть

interface OrganizationModalProps {
  organizations: Organization[];
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
          {organizations.length > 0 ? (
            <ul className="organization-list">
              {organizations.map((org) => (
                <li key={org.id} className="organization-item">
                  <span>{org.name}</span>
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




