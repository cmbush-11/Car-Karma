import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';
import CustomersList from './CustomerList';
import CustomerForm from './CustomerForm';
import SaleForm from './SaleForm';
import SaleList from './SaleList';


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
          </Route>
          <Route path="/customers">
            <Route index element={<CustomersList/>}/>
            <Route path = "/customers/add" element = {<CustomerForm/>}/>
          </Route>
          <Route path="/sales">
            <Route index element={<SaleList/>}/>
            <Route path = "/sales/add" element = {<SaleForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
