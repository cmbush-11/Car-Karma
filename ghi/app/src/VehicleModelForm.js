import React, { useEffect, useState }  from 'react';


function VehicleModelForm() {
    const [manufacturers, setManufacturers] = useState([])
    const [formData, setFormData]=useState({
        name:'',
        manufacturer:'',
        picture_url:'',
    })

    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const manufacturerList = await response.json();
            setManufacturers(manufacturerList.manufacturers)
            console.log(manufacturerList.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();



        const url = 'http://localhost:8100/api/models/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };console.log(fetchOptions)
        console.log(url)

        const modelResponse = await fetch(url, fetchOptions);
        if (modelResponse.ok) {
            setFormData({
                name:'',
                manufacturer:'',
                picture_url:'',
            })
            setIsSubmitted(true);
        }
    }
    const handleChangeName=(e)=>{
        const value = e.target.value
        const inputName=e.target.name
        setFormData({
            ...formData,
            [inputName]:value
        })
    }

    const formClasses = (!isSubmitted) ? '' : 'd-none'
    const messageClasses = (!isSubmitted) ? 'alert alert-success d-none mb-0': 'alert alert-success mb-0'



return (
    <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
        </div>

        <div className="col">
          <div className="card shadow">
            <div className="card-body">

              <form className={formClasses} onSubmit={handleSubmit} id="create-vehicle-form">
                <h1 className="card-title">Add a New Vehicle!</h1>
                <p className="mb-3">
                  Please fill out the required fields.
                </p>

                <div className="mb-3">
                {/* <select onChange={handleChangeName} name="manufacturer" id="manufacturer" required>
                    <option value="">Choose a manufacturer</option>
                    {
                      manufacturers.map(manufacturer => {
                        return (
                          <option key={manufacturer.id} value={manufacturer.href}>{manufacturer.name}</option>
                        )
                      })
                    }
                  </select> */}

                  <select onChange={handleChangeName} value={formData.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                <option value="">Choose a manufactuer</option>
                {manufacturers.map(manufacturer=> {
                  return (
                    <option key={manufacturer.href} value={manufacturer.id}>{manufacturer.name}</option>
                  )
                })}
              </select>

                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} value={formData.name}required placeholder="name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Choose a name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} value={formData.picture_url}required placeholder="picture url" type="text" id="picture_url" name="picture_url" className="form-control" />
                      <label htmlFor="picture_url">picture</label>
                    </div>
                  </div>

                </div>
                <button className="btn btn-lg btn-primary">Submit!</button>
              </form>

              <div className={messageClasses} id="success-message">
                Congratulations!
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VehicleModelForm;



//     return (
//         <div className='my-5 container'>
//             <div className='row'>
//                 <div className='offset-3 col-6'>
//                     <div className='shadow p-4 mt-4'>
//                         <h1>Add Vehicle Model</h1>
//                         <form onSubmit={handleSubmit}>
//                         <div className='form-floating mb-3'>
//                             <input
//                                 value={modelName}
//                                 onChange={(event) => setModelName(event.target.value)}
//                                 required placeholder='Model Name'
//                                 type='text'
//                                 id='Model Name'
//                                 name='Model Name'
//                                 className='form-control' />
//                             <label htmlFor='Model Name'>Model Name</label>
//                         </div>
//                         <div className='col'>
//                         <div className='form-floating mb-3'>
//                             <input
//                                 value={pictureUrl}
//                                 onChange={(event) => setPictureUrl(event.target.value)}
//                                 required placeholder='Picture'
//                                 type='text'
//                                 id='Picture'
//                                 name='Picture'
//                                 className='form-control' />
//                             <label htmlFor='Picture'>Picture</label>
//                         </div>
//                         </div>
//                     <div className='col'>
//                         <div className='mb-3'>
//                             <select
//                                 value={manufacturer}
//                                 onChange={(event) => setManufacturer(event.target.value)}
//                                 name='manufacturer'
//                                 id='manufacturer'
//                                 className={dropdownClasses} required>
//                                 <option value=''>Select Manufacturer</option>
//                                 {manufacturers.map(manufacturer => {
//                                     return (
//                                         <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
//                                     )
//                                 })}
//                             </select>
//                         </div>
//                     </div>
//                         <button className='btn btn-lg btn-primary'>Add Vehicle Model</button>
//                         { isSubmitted === true && (
//                             <div className='alert alert-success mb-0' id='success-message'>
//                                 <p></p>
//                                 <p>Vehicle Model Added</p>
//                             </div>
//                         )}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default VehicleModelForm;
