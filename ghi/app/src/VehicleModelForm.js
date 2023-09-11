import React, { useEffect, useState }  from 'react';


function VehicleModelForm() {
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [make, setMake] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const makeData = await response.json();
            setManufacturers(makeData.manufacturers);
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleMakeChange = (event) => {
        const value = event.target.value;
        setMake(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const modelData = {}
        modelData.name = name;
        modelData.picture_url = pictureUrl;
        modelData.manufacturer_id = make;
        console.log("Model deets:", modelData);
        console.log("Stringified Deets!", JSON.stringify(modelData));

        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(modelData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

    const manufacturerResponse = await fetch(modelUrl, fetchOptions);
    if (manufacturerResponse.ok) {
        setName('');
        setPictureUrl('');
        setMake('');
        setIsSubmitted(true);
    }
}

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Model Info</h1>
                        <form onSubmit={handleSubmit} id="add-model-form">
                        <div className='mb-3'>
                            <select
                                value={make}
                                onChange={handleMakeChange}
                                name='make'
                                id='make'
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
                        <div className='form-floating mb-3'>
                            <input
                                value={name}
                                onChange={handleNameChange}
                                required placeholder='Model Name'
                                type='text'
                                id='Model Name'
                                name='Model Name'
                                className='form-control'
                            />
                            <label htmlFor='Name'>Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input
                                value={pictureUrl}
                                onChange={handlePictureUrlChange}
                                required placeholder='Picture'
                                type='text'
                                id='Picture'
                                name='Picture'
                                className='form-control'
                            />
                            <label htmlFor='Picture'>Picture URL</label>
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


// {
//     "name": "XC90",
//     "picture_url": "https://upload.wikimedia.org/wikipedia/commons/a/aa/2013_Volvo_XC90.jpg",
// "manufacturer": 1
// }
