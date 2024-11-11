import React, { FC, useState } from "react";
import "./RequestModal.css";
import Modal from "../Modal";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string[];
  setSelectionState: (val: string) => void;
}
const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
export const RequestModal: FC<RequestModalProps> = ({
  isOpen,
  onClose,
  data,setSelectionState
}) => {
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [problems, setProblems] = useState("");

  const sendData = () => {
    const userName = sessionStorage.getItem("userName"); // Получаем имя пользователя из sessionStorage

    const requestData = {
      action: "CREATE_APPEAL",
      user_name: userName,
      serial_number: data[2],
      product_number: "",
      product: data[1],
      supp_number: data[0],
      put_address: data[5],
      problem_description: problems,
      critical_rate: data[6],
      file_link: "",
      date: getCurrentDate(),
      employee: staffName,
      employee_email: staffEmail,
      support_start_date: data[3],
      support_end_date: data[4],
      status: "В очереди",
    };

    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
      console.log("Отправка данных: ", JSON.stringify(requestData)); // Добавьте отладку
      window.ws.send(JSON.stringify(requestData));
      window.ws.onmessage = (event: { data: string }) => {
        const message = JSON.parse(event.data);
        console.log(`mes`, message);
        if (event.data && event.data === "200") {
          onClose();
          setSelectionState('requests')
        }
      };
    } else {
      console.error("Ошибка соединения с сервером");
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="request-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Создать обращение</h2>
            <button onClick={onClose} className="close-button">
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-body-list">
              {data.length > 0 && data.map((item) => <span>{item}</span>)}
            </div>
            <br />
            <br />
            <span>Сотрудник</span>{" "}
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />
            <span>email сотрудника</span>{" "}
            <input
              type="text"
              value={staffEmail}
              onChange={(e) => setStaffEmail(e.target.value)}
            />
            <span>Описание проблемы</span>{" "}
            <input
              type="text"
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
            />
            <button onClick={sendData}>Отправить</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
