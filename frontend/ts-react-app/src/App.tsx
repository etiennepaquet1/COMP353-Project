import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import {useEffect, useState } from react;
import axios from 'axios';
import Menu from "./Menu/Menu";
import FacilityOperations from "./CRUD/FacilityOperations/FacilityOperations";
import ResidenceOperations from './CRUD/ResidenceOperations/ResidenceOprations';
import EmployeeOperations from './CRUD/Employee/EmployeeOperations';
import VaxOperations from './CRUD/VaxOperations/VaxOperations';
import InfectionOperations from './CRUD/InfectionOperations/InfectionOperations';
import PersonOperations from './CRUD/PersonOperations/PersonOperations';
import { useState } from 'react';
import Modal from "./Templates/Modal/Modal"
import Button from './Templates/Button/Button';
import Linker from './Templates/Linker/Linker';
import Queries from './Queries/Queries';



function App() {  
  
  const [popup, setPopup] = useState(true);


  return (
    <div className="App">
      <header className="App-header">
      
      


      <BrowserRouter>
        <div>
          <Linker path="/">Home</Linker>
          <Linker path="facility">Facility CRUD</Linker>
          <Linker path="residence">Residence CRUD</Linker>
          <Linker path="employee">Employee Operations</Linker>
          <Linker path="vax">Vax CRUD</Linker>
          <Linker path="infection">Infections CRUD</Linker>
          <Linker path="person">Person CRUD</Linker>
          <Linker path="queries">Queries</Linker>
        </div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path='facility' element={<FacilityOperations/>}/>
          <Route path='residence' element={<ResidenceOperations/>}/>
          <Route path='employee' element={<EmployeeOperations/>}/>
          <Route path='vax' element={<VaxOperations/>}/>
          <Route path='infection' element={<InfectionOperations/>}/>
          <Route path='person' element={<PersonOperations/>}/>
          <Route path='queries' element={<Queries/>}/>
        </Routes>
      </BrowserRouter >



      </header>
    </div>
  );
}

export default App;
