import React from 'react';
import '../styles/Appeal.css';

const Appeal: React.FC = () => {
    return (
        <div className="appeal">
            <h2>Обращения</h2>
            <table>
                <thead>
                    <tr>
                        <th>№ заявки</th>
                        <th>Серийный номер</th>
                        <th>Описание проблемы</th>
                        <th>Дата обращения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123</td>
                        <td>SN12345678</td>
                        <td>Не работает устройство</td>
                        <td>01.07.2024</td>
                    </tr>
                    {}
                </tbody>
            </table>
        </div>
    );
};

export default Appeal;

