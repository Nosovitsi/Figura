import React, {useState} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import MainContent from './MainContent';
import Appeal from './Appeal'; 
import '../styles/Layout.css';
import {MainSection} from "./mainSection/MainSection";

const Layout: React.FC = () => {
    const [selectionState,setSelectionState ] = useState('requests')

    return (
        <div className="layout">
            <Header />
            <div className="content">
                <LeftColumn selectionState={selectionState} setSelectionState={setSelectionState} />
                {/* <Sidebar /> */}
                <MainContent>
                {/* <RouterProvider router={router}/> */}
                    <MainSection selectionState={selectionState} setSelectionState={setSelectionState} />
                    {/*<Appeal />*/}
                </MainContent>
                <RightColumn />
            </div>
        </div>
    );
};

export default Layout;















