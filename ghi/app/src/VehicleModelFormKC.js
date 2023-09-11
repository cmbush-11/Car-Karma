import React, {useState, useEffect} from 'react';

function VehicleModelForm(props) {
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');


    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value)
    };

    const handleNameChange = async (event) => {
        const value = event.target.value;
        setName(value)
    };

    const handlePictureUrlChange = async (event) => {
        const value = event.target.value;
        setPictureUrl(value)
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {};

        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturerer = manufacturer;


    const modelUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
        const newModelUrl = await response.json();
        console.log(newModelUrl);

        setName('');
        setPictureUrl('');
        setManufacturer('');


        }
    }

    async function LoadManufacturers() {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setManufacturers(data.manufacturers);
      } else(
          console.error('An error occured fetching the data')
      )

      }

      useEffect(() => {
        LoadManufacturers();
    }, []);


    return(
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add a Model</h1>
                <form onSubmit={handleSubmit} id="add-model-form">
                  <div className="form-floating mb-3">
                    <input onChange= {handleNameChange} value ={name} placeholder="Name" required type="text" name="name" id ="name" className="form-control"/>
                    <label htmlFor="Name"> Name </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange = {handlePictureUrlChange} value={pictureUrl}placeholder="pictureUrl" required type="text" name="pictureUrl" id="pictureUrl" className="form-control"/>
                    <label htmlFor="pictureUrl">Picture Url</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={handleManufacturerChange} value={manufacturer} required id="manufacturer" name="manufacturer" className="form-select">
                      <option value="">Choose a Manufacturer</option>
                      {manufacturers.map(manufacturer => {
                            return (
                            <option key ={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                            </option>
                            );
                          })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>

      );



}






export default VehicleModelForm;
