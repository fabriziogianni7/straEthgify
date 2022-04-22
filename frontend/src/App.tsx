import React from 'react';
import './App.css';
import StraEthForm from './components/StraEthForm';
import StraEthChart from './components/StraEthChart';
import { GeneralContextProvider } from './context/GeneralContext';

function App() {
  return (
    <div className="App">
      <GeneralContextProvider>
        <div>
          <StraEthForm />

        </div>
        <div>
          <StraEthChart />
        </div>
      </GeneralContextProvider>
    </div>
  );
}

export default App;
