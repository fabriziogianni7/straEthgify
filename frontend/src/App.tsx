import React from 'react';
import './App.css';
import StraEthForm from './components/form-component/StraEthForm';
import StraEthChart from './components/linechart-component/StraEthChart';
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
