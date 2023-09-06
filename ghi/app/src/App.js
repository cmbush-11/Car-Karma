import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesperson from './SalespersonForm';

function App() {



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="salespeople/"
            element={<AddSalesperson getSalespeople={getSalespeople} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
