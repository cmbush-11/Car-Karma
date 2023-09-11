import React from 'react';
import { useEffect, useState } from 'react';


function AppointmentHistoryList() {

  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [autos, setAutomobiles] = useState([])

  const searchField = React.useRef(null)





  const getInventoryData = async () => {
    const url = "http://localhost:8100/api/automobiles/"
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json();

      setAutomobiles(data.autos)
      console.log(data.autos)

    }
  }




  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setAppointments(data.appointments)
      setFilteredAppointments(data.appointments)


    }
  }





  useEffect(() => {
    getData()
    getInventoryData()

  }, [])


const handleSearch = (event) => {
  let filter = searchField.current.value
  let filtered = appointments.filter(a => a.vin.toLowerCase().startsWith(filter.toLowerCase()))
  setFilteredAppointments(filtered)
};




return (



  <div>


    <input placeholder="Search vin" ref={searchField} />
    <button  onClick={handleSearch}>Search</button>






  <table className="table table-striped" data={filteredAppointments}>
      <thead>
        <tr>
          <th>Is VIP?</th>
          <th>Vin</th>
          <th>Date</th>
          <th>Time</th>
          <th>Customer</th>
          <th>Reason</th>
          <th>Technician</th>
          <th>Status</th>

        </tr>
      </thead>
          {/* the map method of arrat instances creates a new array populated with the results of calling a provided function on every element in the calling array */}
      <tbody>
        {filteredAppointments.map(appointment => {
          return (
            <tr key={appointment.id}>
              <td>{String(appointment.vip)}</td>
              <td>{appointment.vin}</td>
              <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
              <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
              <td>{appointment.customer}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.technician.first_name}</td>
              <td>{appointment.status}</td>
              <td></td>
            </tr>
          )
        })}
      </tbody>

    </table>

  </div>
)

      }






export default AppointmentHistoryList
