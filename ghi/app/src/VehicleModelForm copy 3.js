import React, { useEffect, useState }  from 'react';

function VehicleModelForm () {
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturerList, setManufacturerList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(true);

    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const manufacturerList = await response.json();
            setManufacturerList(manufacturerList.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer = manufacturer;

        const url = 'http://localhost:8100/api/models/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const modelResponse = await fetch(url, fetchOptions);
        if (modelResponse.ok) {
            setName('');
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
                        <h1>Add Model</h1>
                        <form onSubmit={handleSubmit} id="add-model-form">
                        <div className='form-floating mb-3'>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required placeholder='Name'
                                type='text'
                                id='Name'
                                name='Name'
                                className='form-control'
                            />
                            <label htmlFor='Name'>Name of Model</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <select
                                value={manufacturer}
                                onChange={(event) => setManufacturer(event.target.value)}
                                required placeholder='Manufacturer'
                                type='text'
                                id='Manufacturer'
                                name='Manufacturer'
                                className={dropdownClasses}>
                                    <option value=''>Select Manufacturer</option>
                                    {manufacturerList.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                value={pictureUrl}
                                onChange={(event) => setPictureUrl(event.target.value)}
                                required placeholder='Picture URL'
                                type='text'
                                id='Picture URL'
                                name='Picture URL'
                                className='form-control'
                            />
                            <label htmlFor='Picture URL'>Picture URL</label>
                        </div>
                        <button className='btn btn-lg btn-primary'>Add Model</button>
                        { isSubmitted && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p>Model Added</p>
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
