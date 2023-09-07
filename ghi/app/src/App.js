import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
