import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import './App.css';
import StraEthForm from './components/form-component/StraEthForm';
import StraEthChart from './components/linechart-component/StraEthChart';
import StraFooter from './components/navbar-component/StraFooter';
import StraNavbar from './components/navbar-component/StraNavbar';
import { GeneralContextProvider } from './context/GeneralContext';
import FormAndChart from "./components/formAndChart";
import Balances from "./components/balances";

function App() {
  return (
    <GeneralContextProvider>
      <StraNavbar />
      <Router >
        <Routes>
          <Route path={'/'} element={<FormAndChart />}/>
          <Route path={'/balances'} element={<Balances />} />
        </Routes>
      </Router>
      <StraFooter />
    </GeneralContextProvider>
  );
}

export default App;
