import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import MainContent from './MainContent';
import Appeal from './Appeal'; // Можно заменить на другие компоненты по необходимости
import '../styles/Layout.css';

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <LeftColumn />
                <Sidebar />
                <MainContent>
                {/* <RouterProvider router={router}/> */}
                    <Appeal />
                </MainContent>
                <RightColumn />
            </div>
        </div>
    );
};

export default Layout;















