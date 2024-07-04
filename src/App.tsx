import React from 'react';
import LeftBar from './components/LeftBar';
import Column2 from './components/Column2';
import Column3 from './components/Column3';



function App() {
  return (
    <div className="App">
      <div className="site">
         <LeftBar />
         <Column2 /> 
         <Column3 /> 
       </div>

    </div>
  );
}

export default App;