import React, { useEffect, useState }  from 'react';


function SalespersonForm(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId

        const salespersonUrl = 'http://localhost:8090/api/salespeople/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const salespersonResponse = await fetch(salespersonUrl, fetchOptions);
        if (salespersonResponse.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            setIsSubmitted(true);
            props.getSalespeople();
        }
    }

    let dropdownClasses = 'form-select';

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Add Salesperson</h1>
                        <form onSubmit={handleSubmit} id="add-salesperson-form">
                        <div className='form-floating mb-3'>
                            <input
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required placeholder='First Name' type='text' id='First Name' name='First Name' className='form-control'
                            />
                            <label htmlFor='First Name'>First Name</label>
                        </div>
                        <div className='col'>
                        <div className='form-floating mb-3'>
                            <input
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                required placeholder='Last Name' type='text' id='Last Name' name='Last Name' className='form-control'
                            />
                            <label htmlFor='Last Name'>Last Name</label>
                        </div>
                        </div>
                        <div className='col'>
                        <div className='form-floating mb-3'>
                            <input
                                value={employeeId}
                                onChange={(event) => setEmployeeId(event.target.value)}
                                required placeholder='Employee ID' type='text' id='Employee ID' name='Employee ID' className='form-control'
                            />
                            <label htmlFor='Employee ID'>Employee ID</label>
                        </div>
                        </div>
                        <button className='btn btn-lg btn-primary'>Add Salesperson</button>
                        { isSubmitted && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p>Salesperson Added</p>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
 }

 export default SalespersonForm;
