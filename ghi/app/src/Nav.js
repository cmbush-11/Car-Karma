import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/customers">Customers</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/customers/add">Add Customer</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/salespeople">Salespeople</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/salespeople/add">Add Salesperson</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/salespeople/history">Salesperson History</NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className="nav-link" to="/sales">Sales</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/sales/add">Add Sale</NavLink>
            </li>
             <li>
            <NavLink className="nav-link" to="/technicians">Technicians</NavLink>
            </li>
            <li>
            <NavLink className="nav-link" to="/technicians/new/">Add Technician</NavLink>
            </li>
            <li>
            <NavLink className="nav-link" to="/appointments/">Appointments</NavLink>
            </li>
            <li>
            <NavLink className="nav-link" to="/appointments/new/">Create Appointment</NavLink>
            </li>
            <li>
            <NavLink className="nav-link" to="/appointments/history/">Appointment History</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/manufacturers/add">Add Manufacturer</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/models/">Vehicle Models</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/models/add">Add Vehicle Model</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/automobiles/">Auto Inventory</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/automobiles/add">Add Auto to Inventory</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
