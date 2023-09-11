import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentForm from './AppointmentForm';
import AppointmentHistoryList from './AppointmentHistory';
import AppointmentList from './AppointmentList';
import AutoList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import CustomersList from './CustomerList';
import CustomerForm from './CustomerForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';
import SalespersonHistory from './SalespersonHistory';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
           path="technicians">
            <Route index element={<TechnicianList/>}/>
            <Route path="new" element={<TechnicianForm/>}/>
          </Route>
          <Route path="appointments">
              <Route index element={<AppointmentList/>}/>
              <Route path="new" element={<AppointmentForm/>}/>
              <Route path="history" element={<AppointmentHistoryList/>}/>
              </Route>
          <Route path="/salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="salespeople/add" element={<SalespersonForm />} />
            <Route path="/salespeople/history" element={<SalespersonHistory />} />
          </Route>
          <Route path="/customers">
            <Route index element={<CustomersList />} />
            <Route path="/customers/add" element={<CustomerForm />} />
          </Route>
          <Route path="/sales">
            <Route index element={<SaleList />} />
            <Route path="/sales/add" element={<SaleForm />} />
          </Route>
          <Route path="/salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="/salespeople/add" element={<SalespersonForm />} />
            <Route path="/salespeople/history" element={<SalespersonHistory />} />
          </Route>
          <Route path="/manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="/manufacturers/add" element={<ManufacturerForm />} />
          </Route>
          <Route path="/models">
            <Route index element={<VehicleModelList />} />
            <Route path="/models/add" element={<VehicleModelForm />} />
          </Route>
          <Route path="/automobiles">
            <Route index element={<AutoList />} />
            <Route path="/automobiles/add" element={<AutomobileForm />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
