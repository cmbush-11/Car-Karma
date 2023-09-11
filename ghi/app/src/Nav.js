import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            <li >
              <NavLink className="nav-link " to="/models/">Vehicle Models</NavLink>
            </li>
            <li >
              <NavLink className="nav-link " to="/models/new/">Add a Vehicle</NavLink>
            </li>
            <li >
              <NavLink className="nav-link " to="/automobiles/">Automobiles</NavLink>
            </li>
            <li >
              <NavLink className="nav-link " to="/automobiles/new/">Add new Automobile</NavLink>
            </li>
            <li >
              <NavLink className="nav-link " to="/manufacturers/">Manufacturers</NavLink>
            </li>
            <li >
              <NavLink className="nav-link " to="/manufacturers/new/">Add a Manufacturer</NavLink>
            </li>




          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
