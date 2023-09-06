import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesperson from './SalespersonForm';
import SalespeopleList from './SalespeopleList';


function App(props) {
  const [setSalespeople] = useState([]);

  if (props.salespeople === undefined) {
    return null;
  }

  const getSalespeople = (updatedSalespeople) => {
    if (!updatedSalespeople) {
      fetch('http://localhost:8090/api/salespeople/')
        .then(response => response.json())
        .then(data => {
          setSalespeople(data);
        })
        .catch(error => {
          console.error("Error Fetching Salespeople:", error);
        });
    } else {
      setSalespeople(updatedSalespeople);
    }
  };


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="salespeople/"
            element={<SalespeopleList salespeople={props.salespeople} />}
          />
          <Route
            path="addSalesperson/"
            element={<AddSalesperson getSalespeople={getSalespeople} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
