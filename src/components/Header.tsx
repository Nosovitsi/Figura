import React from 'react';
import '../styles/Header.css';
import logo from '../assets/slider-logo.svg';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-logo-container">
                <img src={logo} alt="Logo" className="header-logo" />
                <span className="header-title">FIGURA</span>
            </div>
            <h1>Личный кабинет заказчика</h1>
        </header>
    );
};

export default Header;



