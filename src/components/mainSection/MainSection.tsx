import React from "react";
import "./MainSection.css";
import Appeal from "../Appeal";
import {DevicesSection} from "../devicesSection/DevicesSection";


interface MainSectionProps { selectionState:string; setSelectionState:(val:string) => void }

export const MainSection: React.FC<MainSectionProps> = ({selectionState,setSelectionState}) => {
    return (
        <div className="main-section-container">
            {selectionState === 'devices' && <DevicesSection setSelectionState={setSelectionState} />}
            {selectionState === 'requests' && <Appeal/>}
        </div>
    );
};

