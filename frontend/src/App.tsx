import React from 'react';
import './App.css';
import StraEthForm from './components/StraEthForm';
import StraEthChart from './components/StraEthChart';

function App() {
  return (
    <div className="App">
      <div>
        <StraEthForm/>

      </div>
      <div>
      <StraEthChart/>
      </div>
    </div>
  );
}

export default App;
