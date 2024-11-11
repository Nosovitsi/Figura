import React, {useEffect, useState} from "react";
import "./DevicesSection.css";
import {RequestModal} from "../requestModal/RequestModal";


interface MainSectionProps {
    selectionState?: string;
    setSelectionState: (val: string) => void
}

export const DevicesSection: React.FC<MainSectionProps> = ({setSelectionState}) => {
    const [organizationsData, setOrganizationsData] = useState<Array<string>[]>([]);
    const [isOpenRequestModal, setIsOpenRequestModal] = useState<boolean>(false);
    const [selectedOrganization, setSelectedOrganization] = useState<string[]>([]);
    const [filteredItems, setFilteredItems] = useState<Array<string>[]>([]);

    const [query, setQuery] = useState('');

    const handleFilter = () => {
        setFilteredItems( organizationsData.filter(item => item[2].toLowerCase().includes(query.toLowerCase())));
    };
    const handleReset = () => {
        setQuery('')
        setFilteredItems( organizationsData);
    };

    const handleClickBtn = (data:string[])=>{
        setIsOpenRequestModal(true);
        setSelectedOrganization(data)
    }
    const handleCloseModal = ()=>{
        setIsOpenRequestModal(false);
        setSelectedOrganization([])
    }
    useEffect(() => {
        handleNewRequest()
    }, []);

    const handleNewRequest = () => {
        const userName = sessionStorage.getItem("userName"); // Получаем имя пользователя из sessionStorage

        const requestData = {
            action: "SHOW_EQUIPMENT_LIST",
            user_name: userName,
        };

        if (window.ws && window.ws.readyState === WebSocket.OPEN) {
            console.log("Отправка данных: ", JSON.stringify(requestData)); // Добавьте отладку
            window.ws.send(JSON.stringify(requestData));
            window.ws.onmessage = (event: { data: string; }) => {
                const message = JSON.parse(event.data);
                console.log(`mes`, message)
                if (event.data && message?.EQUIPMENT_LIST && message.EQUIPMENT_LIST.length !== 0) {
                    setOrganizationsData([...message.EQUIPMENT_LIST]);
                    setFilteredItems([...message.EQUIPMENT_LIST]);
                }
            }
        } else {
            console.error("Ошибка соединения с сервером");
        }
    };
    return (
        <div className="devices-section-content">
            <div className="header">
                <h2>Список оборудования</h2>
            </div>
            <div className="body">
                <span>Введите серийный номер:</span>
                <input
                    type="text"
                    placeholder="Введите текст для фильтрации..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleFilter}>Искать</button>
                <button onClick={handleReset}>Сбросить</button>

                {filteredItems.length > 0 ? (
                    <ul className="organization-list">
                        {filteredItems.map((org, index, {length}) => (
                            <li key={`${index}-${length - index}-${org[3]}`} className="organization-item">
                                <div className="organization-list-data">
                                    <div><span>Оборудование: </span><span>{org[1]}</span></div>
                                    <div><span>Серийный номер: </span><span>{org[2]}</span></div>
                                    <span>{org[0]}</span>

                                </div>
                                <button onClick={() => handleClickBtn(org)}>Создать обращение</button>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет доступного оборудования</p>
                )}
            </div>
            <RequestModal isOpen={isOpenRequestModal} onClose={handleCloseModal} data={selectedOrganization} setSelectionState={setSelectionState} />
        </div>
    );
};

