import React, { useEffect, useState }  from 'react';


function CustomerForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const customerResponse = await fetch(customerUrl, fetchOptions);
        if (customerResponse.ok) {
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
            setIsSubmitted(true);
        }
    }

    let dropdownClasses = 'form-select';

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Add Customer</h1>
                        <form onSubmit={handleSubmit} id="add-customer-form">
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
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                required placeholder='Address' type='text' id='Address' name='Address' className='form-control'
                            />
                            <label htmlFor='Address'>Address</label>
                        </div>
                        </div>
                        <div className='col'>
                        <div className='form-floating mb-3'>
                            <input
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                required placeholder='Phone Number' type='text' id='Phone Number' name='Phone Number' className='form-control'
                            />
                            <label htmlFor='Phone Number'>Phone Number</label>
                        </div>
                        </div>
                        <button className='btn btn-lg btn-primary'>Add Customer</button>
                        { isSubmitted && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p>Customer Added</p>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
 }

 export default CustomerForm;
