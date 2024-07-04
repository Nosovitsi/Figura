import React from 'react';
import './App.css';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';
import MainContent from './components/MainContent/MainContent';





function App() {
  return (
    <div className="App">
      <div className="container">
        <LeftBar />
        <MainContent />
        <RightBar />
      </div>
    </div>
  );
}

export default App;