import React, { ReactNode } from 'react';
import '../styles/MainContent.css';

interface MainContentProps {
    children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <main className="main-content">
            {children}
        </main>
    );
};

export default MainContent;



