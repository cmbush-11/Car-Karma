import React, { useEffect, useState }  from 'react';


function AutomobileForm() {

    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [sold, setSold] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchData = async () => {
        const modelsResponse = await fetch('http://localhost:8100/api/models/')
        const manufacturersResponse = await fetch ('http://localhost:8100/api/manufacturers/')

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            color: color,
            year: year,
            vin: vin,
            sold: sold,
            manufactuer: manufacturer,
            model: model,
        };


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
        setSold(false);
        setIsSubmitted(true);
    }
}

    let dropdownClasses = 'form-select';

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
                                onChange={(event) => setVin(event.target.value)}
                                required placeholder='VIN'
                                type='text'
                                id='VIN'
                                name='VIN'
                                className='form-control'
                            />
                            <label htmlFor='VIN'>VIN</label>
                        </div>
                        <div className='col'>
                            <div className='form-floating mb-3'>
                                <input
                                    value={color}
                                    onChange={(event) => setColor(event.target.value)}
                                    required placeholder='Color'
                                    type="text"
                                    id='Color'
                                    name='Color'
                                    className='form-control'
                                />



                                <label htmlFor='Color'>Color</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-floating mb-3'>
                                <input
                                    value={year}
                                    onChange={(event) => setYear(event.target.value)}
                                    required placeholder='Year'
                                    type='text'
                                    id='Year'
                                    name='Year'
                                    className='form-control'
                                />
                                <label htmlFor='Year'>Year</label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-floating mb-3'>
                                <select
                                    value={manufacturer}
                                    onChange={(event) => setManufacturer(event.target.value)}
                                    required placeholder='Manufacturer'
                                    type='text'
                                    id='Model'
                                    name='Model'
                                    className={dropdownClasses}>
                                        <option value=''>Select Manufacturer</option>
                                        {manufacturers.map(manufacturer => {
                                            return (
                                                <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                            )
                                        })}
                                    </select>
                            </div>
                        </div>
                        </div>
                        <div className='col'>
                            <div className='form-floating mb-3'>
                                <select
                                    value={model}
                                    onChange={(event) => setModel(event.target.value)}
                                    required placeholder='Model'
                                    type='text'
                                    id='Model'
                                    name='Model'
                                    className={dropdownClasses}>
                                        <option value=''>Select Model</option>
                                        {models.map(model => {
                                            return (
                                                <option key={model.id} value={model.id}>{model.name}</option>
                                            )
                                        })}
                                    </select>

                            </div>
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
