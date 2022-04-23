import React from 'react';
import './App.css';
import StraEthForm from './components/form-component/StraEthForm';
import StraEthChart from './components/linechart-component/StraEthChart';
import StraFooter from './components/navbar-component/StraFooter';
import StraNavbar from './components/navbar-component/StraNavbar';
import { GeneralContextProvider } from './context/GeneralContext';

function App() {
  return (
    <GeneralContextProvider>
      <StraNavbar />
      <div className="App">
        <StraEthForm />
        <div>
          <StraEthChart />
        </div>
      </div>
      <StraFooter/>
    </GeneralContextProvider>
  );
}

export default App;
