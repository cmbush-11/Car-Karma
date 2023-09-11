import React, { useEffect, useState }  from 'react';


function AutomobileForm() {

    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchData = async () => {
        const [modelsResponse, manufacturersResponse] = await Promise.all([
            fetch('http://localhost:8100/api/models/'),
            fetch('http://localhost:8100/api/manufacturers/')
        ]);

        if (modelsResponse.ok && manufacturersResponse.ok) {
            const modelsData = await modelsResponse.json();
            const manufacturersData = await manufacturersResponse.json();
            setModels(modelsData.models);
            setManufacturers(manufacturersData.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            color: color,
            year: year,
            vin: vin,
            manufacturer: manufacturer,
            model: model,
        };
        console.log("Stringified Car Deets:", JSON.stringify(data));

    const autoUrl = 'http://localhost:8100/api/automobiles/'
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const autoResponse = await fetch(autoUrl, fetchOptions);
    if (autoResponse.ok) {
        setVin('');
        setColor('');
        setYear('');
        setModel('');
        setManufacturer('');
        setIsSubmitted(true);
    } else {
        console.error('Error:', autoResponse.status, autoResponse.statusText);
        const errorMessage = await autoResponse.text();
        console.error('Error Message:', errorMessage);
    }
}

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Add Automobile to Inventory</h1>
                        <form onSubmit={handleSubmit} id="add-auto-form">
                        <div>
                        <div className='form-floating mb-3'>
                            <input
                                value={vin}
                                onChange={handleVinChange}
                                required placeholder='VIN'
                                type='text'
                                id='VIN'
                                name='VIN'
                                className='form-control'
                            />
                            <label htmlFor='VIN'>VIN</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                value={color}
                                onChange={handleColorChange}
                                required placeholder='Color'
                                type='text'
                                id='Color'
                                name='Color'
                                className='form-control'
                            />
                            <label htmlFor='Color'>Color</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                value={year}
                                onChange={handleYearChange}
                                required placeholder='Year'
                                type='text'
                                id='Year'
                                name='Year'
                                className='form-control'
                            />
                            <label htmlFor='Year'>Year</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <select
                                value={manufacturer}
                                onChange={handleManufacturerChange}
                                required placeholder='Manufacturer'
                                type='text'
                                id='Manufacturer'
                                name='Manufacturer'
                                className='form-select'
                            >
                                <option value=''>Select Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option
                                            value={manufacturer.id}
                                            key={manufacturer.id} >
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                        <div className='form-floating mb-3'>
                            <select
                                value={model}
                                onChange={handleModelChange}
                                required placeholder='Model'
                                type='text'
                                id='Model'
                                name='Model'
                                className='form-select'
                            >
                                <option value=''>Select Model</option>
                                {models.map(model => {
                                    return (
                                        <option
                                            value={model.id}
                                            key={model.id}>
                                            {model.name}
                                        </option>
                                    )
                                })}
                            </select>
                    </div>
                        <button className='btn btn-lg btn-primary'>Add Automobile</button>
                        { isSubmitted && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p>Automobile Added</p>
                            </div>
                        )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
 }

 export default AutomobileForm;
