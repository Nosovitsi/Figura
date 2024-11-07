import React, {FC} from "react";
import {User} from "./types";
import {Input} from "./Input";

interface DealsModalProps {
    selectedUser:User | null;
    handleCloseDealsModal: ()=>void;
    handleDeleteDeal: (name:string,deal:string)=>void;
    handleAddDeal: (name:string)=>void;
    setNameNewDeal: (name: string)=>void;
}

export const DealsModal:FC<DealsModalProps> = ({selectedUser,handleCloseDealsModal,handleDeleteDeal,handleAddDeal,setNameNewDeal}) => {
    if (!selectedUser) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Список договоров - {selectedUser.name}</h2>
                    <button onClick={handleCloseDealsModal} className="close-button">×</button>
                </div>
                <div className="modal-body">
                    {selectedUser.deals.length > 0 ? (
                        <ul className="deals-list">
                            {selectedUser.deals.map((deal, index) => (
                                <li key={index} className="deal-item">
                                    <span>{deal}</span>
                                    <button
                                        onClick={() => handleDeleteDeal(selectedUser.name, deal)}
                                        className="delete-button"
                                    >
                                        Удалить
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Нет договоров</p>
                    )}
                </div>
                <div className="modal-footer">
                  <Input onChange={setNameNewDeal} />

                    <button onClick={() => handleAddDeal(selectedUser.name)}>
                        Добавить договор
                    </button>
                </div>
            </div>
        </div>
    );
};