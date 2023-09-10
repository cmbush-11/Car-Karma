import React, {useState, useEffect} from 'react';

function AppointmentForm(){
    const [technicians,setTechnicians]=useState([])
    const [formData,setFormData]=useState({
        date_time:'',
        reason:'',
        vin:'',
        customer:'',
        technician:''
    })

    const [hasSubmitted, setHasSubmitted]=useState(false)

    const getData=async()=>{
        const url='http://localhost:8080/api/technicians/';
        const response=await fetch(url);

        if (response.ok){
            const data=await response.json();
            setTechnicians(data.technicians);
            console.log(data.technicians);
        }
    }

    useEffect(() => {
        getData();
      }, []);

      const handleSubmit= async(event)=>{
        event.preventDefault()

        const url = 'http://localhost:8080/api/appointments/'

        const fetchConfig={
            method:"post",
            body: JSON.stringify(formData),
            headers:{
                'Content-Type': 'application/json',
            }
        }

        const response =await fetch(url,fetchConfig)

        if(response.ok){
            setFormData({
                date_time:'',
                reason:'',
                vin:'',
                customer:'',
                technician:''
            })

        }
      }

      const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
          ...formData,
          [inputName]: value
        });
      }

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a service appointment</h1>
              <form onSubmit={handleSubmit} id="create-appointment-form">

              <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.date_time} placeholder="date_and_time" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                  <label htmlFor="date_time">Date</label>
                </div>


                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                  <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Vin</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="reason">Reason</label>
                  <textarea onChange={handleFormChange} value={formData.reason} className="form-control" id="reason" rows="3" name="reason" ></textarea>
                </div>
                <div className="mb-3">
              <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                <option value="">Choose a technician</option>
                {technicians.map(technician=> {
                  return (
                    <option key={technician.id} value={technician.id}>{technician.first_name}</option>
                  )
                })}
              </select>
            </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    export default AppointmentForm;
