import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        inn: '',
        kpp: '',
        address: '',
        contactFirstName: '',
        contactLastName: '',
        contactPhone: '',
        adminKey: ''
    });
    
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        inn: '',
        kpp: '',
        address: '',
        contactFirstName: '',
        contactLastName: '',
        contactPhone: '',
        adminKey: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = { ...errors };

        if (!formData.username) {
            newErrors.username = 'Имя пользователя обязательно';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введите правильный Email';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        if (!formData.companyName) {
            newErrors.companyName = 'Наименование компании обязательно';
        }
        if (!formData.inn) {
            newErrors.inn = 'ИНН обязателен';
        }
        if (!formData.kpp) {
            newErrors.kpp = 'КПП обязателен';
        }
        if (!formData.address) {
            newErrors.address = 'Адрес обязателен';
        }
        if (!formData.contactFirstName) {
            newErrors.contactFirstName = 'Имя контактного лица обязательно';
        }
        if (!formData.contactLastName) {
            newErrors.contactLastName = 'Фамилия контактного лица обязательна';
        }
        if (!formData.contactPhone) {
            newErrors.contactPhone = 'Телефон контактного лица обязателен';
        }
        if (!formData.adminKey) {
            newErrors.adminKey = 'Admin Key обязателен';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Регистрация успешна');
            navigate('/');
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-columns-container">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Подтверждение пароля:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="companyName">Наименование компании:</label>
                            <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? 'error' : ''}
                            />
                            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="inn">ИНН:</label>
                            <input
                                type="text"
                                name="inn"
                                id="inn"
                                value={formData.inn}
                                onChange={handleChange}
                                className={errors.inn ? 'error' : ''}
                            />
                            {errors.inn && <span className="error-message">{errors.inn}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="kpp">КПП:</label>
                            <input
                                type="text"
                                name="kpp"
                                id="kpp"
                                value={formData.kpp}
                                onChange={handleChange}
                                className={errors.kpp ? 'error' : ''}
                            />
                            {errors.kpp && <span className="error-message">{errors.kpp}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Адрес:</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={errors.address ? 'error' : ''}
                            />
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="adminKey">Admin Key:</label>
                            <input
                                type="text"
                                name="adminKey"
                                id="adminKey"
                                value={formData.adminKey}
                                onChange={handleChange}
                                className={errors.adminKey ? 'error' : ''}
                            />
                            {errors.adminKey && <span className="error-message">{errors.adminKey}</span>}
                        </div>
                    </div>
                </div>

                <button type="submit" className="register-button">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;



















