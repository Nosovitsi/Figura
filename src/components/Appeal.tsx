import React, { useEffect, useState } from "react";
import "../styles/Appeal.css";
import { useLocation } from "react-router-dom";

interface Appeal {
  [key: string]: any;
}

type FieldMapping = {
  [key: string]: string[];
};

type ColumnVisibility = {
  [key: string]: boolean;
};

const Appeals: React.FC = () => {
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    "Номер обращения": true,
    Дата: true,
    "Описание проблемы": true,
    Адрес: true,
    "Прикрепленные файлы": true,
    "Серийный номер": true,
    "Номер продукта": true,
    "Имя продукта": true,
    "№ договора тех поддержки": true,
    "Дата начала ТП": true,
    "Дата окончания ТП": true,
    Критичность: true,
    Статус: true,
    "Дата закрытия": true,
    Сотрудник: true,
    "E-mail сотрудника": true,
  });
  const location = useLocation();

  useEffect(() => {
    const fetchAppeals = () => {
      const requestData = {
        action: "GET_APPEALS",
        client_id: location.state.userId,
      };
      const jsonString = JSON.stringify(requestData);

      if (window.ws && window.ws.readyState === WebSocket.OPEN) {
        window.ws.send(jsonString);
      } else {
        console.error("WebSocket не доступен");
      }
    };

    fetchAppeals();

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.appeals) {
          console.log("Полученные данные:", data.appeals);
          setAppeals(data.appeals);
        }
      } catch (error) {
        console.error("Ошибка при разборе JSON:", error);
      }
    };

    window.ws.addEventListener("message", handleMessage);

    return () => {
      window.ws.removeEventListener("message", handleMessage);
    };
  }, []);

  const getFieldValue = (appeal: Appeal, fieldName: string): string => {
    const possibleFields: FieldMapping = {
      "Номер обращения": ["appeal_number", "appealNumber", "number"],
      Дата: ["Date", "date", "created_at", "createdAt"],
      "Описание проблемы": [
        "Problem description",
        "Problem_description",
        "problemDescription",
        "description",
        "problem",
      ],
      Адрес: ["put_addres", "putAddress", "address"],
      "Прикрепленные файлы": ["attached_files", "attachedFiles", "files"],
      "Серийный номер": ["serial_number", "serialNumber"],
      "Номер продукта": ["product_number", "productNumber"],
      "Имя продукта": ["product", "productName"],
      "№ договора тех поддержки": [
        "supp_number",
        "suppNumber",
        "supportNumber",
      ],
      "Дата начала ТП": ["support_start_date", "supportStartDate", "startDate"],
      "Дата окончания ТП": ["support_end_date", "supportEndDate", "endDate"],
      Критичность: ["critical_rate", "criticalRate", "criticality"],
      Статус: ["status", "appealStatus"],
      "Дата закрытия": ["close_date", "closeDate", "closedAt"],
      Сотрудник: ["employee", "employeeName", "employee_name"],
      "E-mail сотрудника": ["employee_email", "employeeEmail", "email"],
    };

    const fields = possibleFields[fieldName] || [];
    const field = fields.find((f) => f in appeal);
    return field ? appeal[field] : "";
  };

  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  if (appeals.length === 0) {
    return <div>Нет обращений</div>;
  }

  return (
    <div className="appeals-container">
      <h2>Список обращений</h2>
      <div className="column-toggle">
        <span className="toggle-label">Показать колонки:</span>
        {Object.keys(columnVisibility).map((columnName) => (
          <label key={columnName} className="toggle-item">
            <input
              type="checkbox"
              checked={columnVisibility[columnName]}
              onChange={() => toggleColumnVisibility(columnName)}
            />
            <span className="toggle-text">{columnName}</span>
          </label>
        ))}
      </div>
      <div className="table-responsive">
        <table className="appeals-table">
          <thead>
            <tr>
              {Object.entries(columnVisibility).map(
                ([columnName, isVisible]) =>
                  isVisible && <th key={columnName}>{columnName}</th>,
              )}
            </tr>
          </thead>
          <tbody>
            {appeals.map((appeal, index) => (
              <tr key={index}>
                {Object.entries(columnVisibility).map(
                  ([columnName, isVisible]) =>
                    isVisible && (
                      <td key={columnName}>
                        {columnName === "Прикрепленные файлы"
                          ? getFieldValue(appeal, columnName) && (
                              <a
                                href={getFieldValue(appeal, columnName)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                📎 Скачать
                              </a>
                            )
                          : getFieldValue(appeal, columnName)}
                      </td>
                    ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appeals;

