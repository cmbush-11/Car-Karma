import React, { useEffect, useState }  from 'react';

    function AutomobileForm() {
        const [vin, setVin] = useState('');
        const [color, setColor] = useState('');
        const [year, setYear] = useState('');
        const [model, setModel] = useState('');
        const [models, setModels] = useState([]);
        const [make, setMake] = useState('');
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

    const handleMakeChange = (event) => {
        const value = event.target.value;
        setMake(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const autoData = {}
        autoData.vin = vin;
        autoData.color = color;
        autoData.year = parseInt(year);
        autoData.model = model;

        console.log("Car deets:", autoData);
        console.log("Stringified Deets:", JSON.stringify(autoData));

        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(autoData),
            headers: {
                'Content-Type': 'application/json',
            },
    };

    const response = await fetch(autoUrl, fetchOptions);
    if (response.ok) {
        setVin('');
        setColor('');
        setYear('');
        setModel('');
        setMake('');
        setIsSubmitted(true);
    }
}

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                    <h1>Auto Info</h1>
                    <form onSubmit={handleSubmit} id="add-auto-form">
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
                        <label htmlFor='Name'>VIN</label>
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
                        <label htmlFor='Name'>Color</label>
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
                        <label htmlFor='Name'>Year</label>
                    </div>
                    <div className='mb-3'>
                        <select
                            value={make}
                            onChange={handleMakeChange}
                            name='Make'
                            id='Make'
                            className="form-select"
                        >
                            <option value=''>Select Make</option>
                            {manufacturers.map(make => {
                                return (
                                    <option
                                        value={make.id}
                                        key={make.id}>
                                        {make.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <select
                            value={model}
                            onChange={handleModelChange}
                            name='Model'
                            id='Model'
                            className="form-select"
                        >
                            <option value=''>Select Model</option>
                            {models.map(model => {
                                return (
                                    <option
                                        value={model.id}
                                        key={model.id}>
                                        {model.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className='btn btn-lg btn-primary'>Add Auto</button>
                    { isSubmitted && (
                        <div className='alert alert-success mb-0' id='success-message'>
                            <p>Auto Added</p>
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
