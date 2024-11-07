import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: 'example@gmail.com',
        password: 'topsecret',
        confirmPassword: 'topsecret',
        companyName: 'ООО ХЛЕБ И ПИВО',
        inn: '12345',
        kpp: '12345',
        address: 'Москва, улица Красных Фонарей',
        contactFirstName: 'Александр',
        contactLastName: 'Конь',
        contactPhone: '+74955553535',
        adminKey: 'Effective_420'
    });
    
    const [errors, setErrors] = useState({
        username: '',
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

        if (!formData.username) newErrors.username = 'E-mail';
        if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
        if (!formData.companyName) newErrors.companyName = 'Наименование компании обязательно';
        if (!formData.inn) newErrors.inn = 'ИНН обязателен';
        if (!formData.kpp) newErrors.kpp = 'КПП обязателен';
        if (!formData.address) newErrors.address = 'Адрес обязателен';
        if (!formData.contactFirstName) newErrors.contactFirstName = 'Имя контактного лица обязательно';
        if (!formData.contactLastName) newErrors.contactLastName = 'Фамилия контактного лица обязательна';
        if (!formData.contactPhone) newErrors.contactPhone = 'Телефон контактного лица обязателен';
        if (!formData.adminKey) newErrors.adminKey = 'Admin Key обязателен';

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const registrationData = {
                action: 'registration',
                user_name: formData.username,
                password: formData.password,
                company_name: formData.companyName,
                INN: formData.inn,
                KPP: formData.kpp,
                address: formData.address,
                contact_user_name: formData.contactFirstName,
                contact_user_surname: formData.contactLastName,
                phone_number: formData.contactPhone,
                admin_keyword: formData.adminKey,
            };

            if (window.ws && window.ws.readyState === WebSocket.OPEN) {
                window.ws.send(JSON.stringify(registrationData));
                console.log('Данные отправлены через WebSocket:', registrationData);
            } else {
                console.log('WebSocket не открыт');
            }

            navigate('/');
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-columns-container">
                    <div className="form-column">
                        <h2>Регистрация:</h2>
                        <div className="form-group">
                            <label htmlFor="username">E-mail:</label>
                            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={errors.username ? 'error' : ''} />
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Подтверждение пароля:</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="companyName">Наименование компании:</label>
                            <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className={errors.companyName ? 'error' : ''} />
                            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="inn">ИНН:</label>
                            <input type="text" name="inn" id="inn" value={formData.inn} onChange={handleChange} className={errors.inn ? 'error' : ''} />
                            {errors.inn && <span className="error-message">{errors.inn}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="kpp">КПП:</label>
                            <input type="text" name="kpp" id="kpp" value={formData.kpp} onChange={handleChange} className={errors.kpp ? 'error' : ''} />
                            {errors.kpp && <span className="error-message">{errors.kpp}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес:</label>
                            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>
                    </div>

                    <div className="form-column">
                        <h2>Контактное лицо:</h2>
                        <div className="form-group">
                            <label htmlFor="contactFirstName">Имя:</label>
                            <input type="text" name="contactFirstName" id="contactFirstName" value={formData.contactFirstName} onChange={handleChange} className={errors.contactFirstName ? 'error' : ''} />
                            {errors.contactFirstName && <span className="error-message">{errors.contactFirstName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactLastName">Фамилия:</label>
                            <input type="text" name="contactLastName" id="contactLastName" value={formData.contactLastName} onChange={handleChange} className={errors.contactLastName ? 'error' : ''} />
                            {errors.contactLastName && <span className="error-message">{errors.contactLastName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactPhone">Телефон:</label>
                            <input type="tel" name="contactPhone" id="contactPhone" value={formData.contactPhone} onChange={handleChange} className={errors.contactPhone ? 'error' : ''} />
                            {errors.contactPhone && <span className="error-message">{errors.contactPhone}</span>}
                        </div>
                    </div>

                    <div className="form-column">
                        <h2>Admin Key:</h2>
                        <div className="form-group">
                            <label htmlFor="adminKey">Admin Key:</label>
                            <input type="text" name="adminKey" id="adminKey" value={formData.adminKey} onChange={handleChange} className={errors.adminKey ? 'error' : ''} />
                            {errors.adminKey && <span className="error-message">{errors.adminKey}</span>}
                        </div>
                    </div>
                </div>

                <button type="submit" className="register-button">Зарегистрировать</button>
            </form>
        </div>
    );
};

export default Register;




















