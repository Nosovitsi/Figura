import React from 'react';
import Greeting from './components/Greeting';
import Column1 from './components/Column1';
import Column2 from './components/Column2';
import Column3 from './components/Column3';



function App() {
  return (
    <div className="App">
      <Greeting />
      <div className="site">
         <Column1 />
         <Column2 /> 
         <Column3 /> 
       </div>

    </div>
  );
}

export default App;