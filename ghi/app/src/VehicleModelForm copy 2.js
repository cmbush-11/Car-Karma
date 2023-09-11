import React, { useEffect, useState} from 'react';

function VehicleModelForm(props) {
    const [modelName, setModelName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
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
        const data = {
            name: modelName,
            picture_url: pictureUrl,
            manufacturer: manufacturer,
        };
        console.log(data);

    // const handleSubmit = async(event) => {
    //     event.preventDefault();
    //     const data = {}

    //     data.model_name = modelName;
    //     data.picture_url = pictureUrl;
    //     data.manufacturer = manufacturer;

        // const modelUrl = 'http://localhost:8100/api/models/'
        // const fetchConfig = {
        //     method: "post",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        const jsonString = JSON.stringify(data);

        try {
            JSON.parse(jsonString);
            const url = 'http://localhost:8100/api/models/';
            const fetchOptions = {
                method: 'post',
                body: jsonString,
                headers: {
                    'Content-Type': 'application/json',
                },
        };

        // const url = 'http://localhost:8090/api/customers/'
        // const fetchOptions = {
        //     method: 'post',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const newModels = await response.json();
            console.log(newModels);

            setModelName('');
            setPictureUrl('');
            setManufacturer('');
            setIsSubmitted(true);
        }

    } catch (error) {
        console.error("Invalid JSON data:", error);
    }
};

    return(
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add Model</h1>
                <form onSubmit={handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                        <input
                            onChange = {handleModelNameChange}
                            value = {modelName}
                            placeholder ="Model Name"
                            required type = "text"
                            name ="Model Name"
                            id = "Model Name"
                            className ="form-control"
                        />
                        <label htmlFor="Model Name">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange = {handlePictureUrlChange}
                            value ={pictureUrl}
                            placeholder="Picture URL"
                            required type="text"
                            name="Picture"
                            id="Picture"
                            className="form-control"
                        />
                        <label htmlFor="Picture">Picture URL</label>
                    </div>
                    <div className="mb-3">
                        <select
                            onChange = {handleManufacturerChange}
                            value ={manufacturer}
                            required name="Manufacturer"
                            className="form-select"
                        >
                        <option value ="">Select Manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return(
                                <option
                                    key={manufacturer.id}
                                    value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            );
                        })}
                        </select>
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

      );


}

export default VehicleModelForm;
