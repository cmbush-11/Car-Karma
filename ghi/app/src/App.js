import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentHistoryList from './AppointmentHistory';
import AutomobileList from './AutomobileList'
import AutomobileForm from './AutomobileForm';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList'

function App() {
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
           <Route path="models">
            <Route index element={<VehicleModelList/>}/>
            <Route path="new" element={<VehicleModelForm/>}/>

          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList/>}/>
            <Route path="new" element={<AutomobileForm/>}/>

          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturerList/>}/>
            <Route path="new" element={<ManufacturerForm/>}/>

          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
