import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



function AppointmentList(){

    const[appointments, setAppointments]=useState([])
    const [autos,setAutomobiles]=useState([])

    const not_finished_or_cancelled = []



    const getInventoryData=async()=> {
        const url="http://localhost:8100/api/automobiles/"
        const response=await fetch(url)
        if (response.ok){
            const data=await response.json();


            setAutomobiles(data.autos)
             console.log(data.autos)}}





             const getData=async()=>{
              const response=await fetch("http://localhost:8080/api/appointments/");

              if (response.ok){
                  const data = await response.json();
                  console.log(data)
                  const appointment = (data.appointments)
                  const auto=(data.autos)
                  for(let i=0;i<appointment.length;i++) {
                      let a = appointment[i];
                      if(a.status !== "cancelled" && a.status !== "finished"){
                         not_finished_or_cancelled.push(a)
                      }
                  }
                  setAppointments(not_finished_or_cancelled)
                  console.log(not_finished_or_cancelled)

              }
              }



    useEffect(()=>{
        getData();
        getInventoryData()

      }, [])


        async function handleFinish(id){

                const response = await fetch("http://localhost:8080/api/appointments/"+id+'/finish/',{
                    method:"PUT"
                })
                if(response.status === 200) {
                  return getData()
                }
            }


      async function handleCancel(id){

        const response = await fetch('http://localhost:8080/api/appointments/'+id+'/cancel/',{
            method:"PUT"
        })

        if(response.status === 200) {

         return getData()
        }
      }








      return (

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Is VIP?</th>
              <th>Date</th>
              <th>Time</th>
              <th>Customer</th>
              <th>Vin</th>
              <th>Reason</th>
              <th>Technician</th>
            </tr>
          </thead>
          <tbody>

            {appointments.map(appointment=> {
              return (

                <tr key={appointment.id}>
                   <td>{String(appointment.vip)}</td>
                  <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                  <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                  <td>{appointment.customer}</td>
                  <td>{appointment.vin}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.technician.first_name}</td>
                  <td>
                    <button value={appointment.id} className='btn btn-primary' onClick={(e) => handleFinish(e.target.value)
                    }>Finish</button>
                  </td>
                  <td>
                    <button value={appointment.id} className='btn btn-primary' onClick={(e) => handleCancel(e.target.value)
                    }>Cancel</button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

      );

        }






export default AppointmentList;
