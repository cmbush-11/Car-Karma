import React, { useEffect, useState }  from 'react';


function ManufacturerForm() {
    const [manufacturerName, setManufacturerName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = manufacturerName;

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },

        };console.log(fetchOptions)

        const manufacturerResponse = await fetch(manufacturerUrl, fetchOptions);
        if (manufacturerResponse.ok) {
            setManufacturerName('');
            setIsSubmitted(true);
        }
    }

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Add Manufacturer</h1>
                        <form onSubmit={handleSubmit} id="add-customer-form">
                        <div className='form-floating mb-3'>
                            <input
                                value={manufacturerName}
                                onChange={(event) => setManufacturerName(event.target.value)}
                                required placeholder='Manufacturer Name'
                                type='text'
                                id='Manufacturer Name'
                                name='Manufacturer Name'
                                className='form-control'
                            />
                            <label htmlFor='Manufacturer Name'>Manufacturer Name</label>
                        </div>
                        <button className='btn btn-lg btn-primary'>Add Manufacturer</button>
                        { isSubmitted && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p>Manufacturer Added</p>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManufacturerForm;
