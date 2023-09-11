
import React, { useEffect, useState } from 'react';

    function VehicleModelForm(props) {
        const[name, setName] = useState('');
        const[pictureUrl, setPictureUrl] = useState('');
        const[isSubmitted, setIsSubmitted] = useState(false);

        const getModels = (updatedModels) => {
          if(!updatedModels) {
            fetch('http://localhost:8100/api/models/')
                .then((response) => response.json())
                .then((data) => {
                    props.setModels(data);
                })
                .catch((error) => {
                    console.error("Error fetching models:", error);
                });
          } else {
            props.setModels(updatedModels);
          }
        };

        // const [models, setModels] = useState([]);

        // if (props.models === undefined) {
        //   return null;
        // }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {}

        data.name = name;
        data.picture_url = pictureUrl;
        console.log('raw data is:', data);


        const strung = JSON.stringify(data);
        console.log('string is:', strung);
        const url = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: 'post',
            body: strung,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {

            setName('');
            setPictureUrl('');
            setIsSubmitted(true);
            getModels();
        }
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Model Info</h1>
                <form onSubmit={handleSubmit} id="create-sales-form">
                    <div className="form-floating mb-3">
                        <input
                            onChange = {handleNameChange}
                            value = {name}
                            placeholder="Name"
                            required type="text"
                            name="Name"
                            id="Name"
                            className="form-control"
                        />
                        <label htmlFor="Name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange = {handlePictureUrlChange}
                            value = {pictureUrl}
                            placeholder="Picture URL"
                            required type="text"
                            name="Picture URL"
                            id="Picture URL"
                            className="form-control"
                        />
                        <label htmlFor="Picture URL">Picture URL</label>
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
