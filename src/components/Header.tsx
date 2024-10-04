import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/header-logo.svg';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-logo-container">
                <img src={logo} alt="Logo" className="header-logo" />
            </div>
            <nav>
                {/* <Link to="/register" className="header-link">Регистрация</Link>
                <Link to="/admin" className="header-link">Личный кабинет</Link> */}
            </nav>
        </header>
    );
};

export default Header;





