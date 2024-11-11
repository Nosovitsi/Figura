import React, { useState } from 'react';

interface InputProps {
    onChange: (value: string) => void; // Функция для обработки значения
}

export const Input: React.FC<InputProps> = ({ onChange }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue); // Передаем значение в родительскую функцию
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Название договора"
        />
    );
};