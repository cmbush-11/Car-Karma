import React, { useEffect, useState }  from 'react';


function VehicleModelForm() {
    const [modelName, setModelName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const manufacturerList = await response.json();
            setManufacturers(manufacturerList.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);


    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = modelName;
        data.picture_url = pictureUrl;
        data.manufacturer = manufacturer;

        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const modelResponse = await fetch(modelUrl, fetchOptions);
        if (modelResponse.ok) {
            setModelName('');
            setPictureUrl('');
            setManufacturer('');
            setIsSubmitted(true);
        }
    }

    let dropdownClasses = 'form-select';

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Add Vehicle Model</h1>
                        <form onSubmit={handleSubmit}>
                        <div className='form-floating mb-3'>
                            <input
                                onChange={handleModelNameChange}
                                value={modelName}
                                required placeholder='Model Name'
                                type='text'
                                id='Model Name'
                                name='Model Name'
                                className='form-control' />
                            <label htmlFor='Model Name'>Model Name</label>
                        </div>
                        <div className='col'>
                        <div className='form-floating mb-3'>
                            <input
                                value={pictureUrl}
                                onChange={handlePictureUrlChange}
                                required placeholder='Picture'
                                type='text'
                                id='Picture'
                                name='Picture'
                                className='form-control' />
                            <label htmlFor='Picture'>Picture</label>
                        </div>
                        </div>
                    <div className='col'>
                        <div className='mb-3'>
                            <select
                                value={manufacturer}
                                onChange={handleManufacturerChange}
                                name='manufacturer'
                                id='manufacturer'
                                className={dropdownClasses} required>
                                <option value=''>Select Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                        <button className='btn btn-lg btn-primary'>Add Vehicle Model</button>
                        { isSubmitted === true && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p></p>
                                <p>Vehicle Model Added</p>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehicleModelForm;
