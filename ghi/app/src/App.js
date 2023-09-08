import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';
import SalespersonHistory from './SalespersonHistory';
import CustomersList from './CustomerList';
import CustomerForm from './CustomerForm';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import AutoList from './InventoriedAutoList';
import AutomobileForm from './InventoriedAutoForm';

function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople">
            <Route index element={<SalespeopleList/>}/>
            <Route path = "/salespeople/add" element = {<SalespersonForm/>}/>
            <Route path = "/salespeople/history" element = {<SalespersonHistory/>}/>
          </Route>
          <Route path="/customers">
            <Route index element={<CustomersList/>}/>
            <Route path = "/customers/add" element = {<CustomerForm/>}/>
          </Route>
          <Route path="/sales">
            <Route index element={<SaleList/>}/>
            <Route path = "/sales/add" element = {<SaleForm/>}/>
          </Route>
          <Route path="/manufacturers">
            <Route index element={<ManufacturerList/>}/>
            <Route path = "/manufacturers/add" element = {<ManufacturerForm/>}/>
          </Route>
          <Route path="/models">
            <Route index element={<VehicleModelList/>}/>
            <Route path = "/models/add" element = {<VehicleModelForm/>}/>
          </Route>
          <Route path="/automobiles">
            <Route index element={<AutoList/>}/>
            <Route path = "/automobiles/add" element = {<AutomobileForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
