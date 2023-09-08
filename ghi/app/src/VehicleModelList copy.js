import React, {useState, useEffect} from 'react';

function VehicleModelList() {
    const [models, setModels] = useState([]);

    const fetchModels = async () => {
        try {
          const response = await fetch('http://localhost:8100/api/models/');
          if (response.ok) {
            const data = await response.json();
            console.log('data is this:',data);
            setModels(data.models);
          } else {
            console.error('API request failed');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    useEffect(() => {
        fetchModels();
    }, []);

    console.log('Models is this:', models);

    return (
        <div className='shadow p-4 mt-4'>
        <h1>Vehicle Models</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (<tr key ={model.id}>
                            <td>{ model.manufacturer }</td>
                            <td>{ model.name }</td>
                            <td>
                                {model.picture_url && (
                                <img
                                    src={model.picture_url.href}
                                    alt={`Model ${model.id}`}
                                    style={{ maxWidth: "100px" }}
                               />
                            )}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default VehicleModelList













































// import React, {useState, useEffect} from 'react';

// function VehicleModelList() {
//     const [models, setModels] = useState([])

//     const fetchModels = async () => {
//         const response = await fetch ('http://localhost:8100/api/models/')
//         if (response.ok) {
//             const data = await response.json();
//             setModels(data.models)
//         }
//     }

//     useEffect(() => {
//         fetchModels();
//     }, []);

//     return (
//         <div className='shadow p-4 mt-4'>
//             <h1>Vehicle Models</h1>
//             <table className='table table-striped'>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Manufacturer</th>
//                         <th>Picture</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {models.map(model => {
//                         return (<tr key={model.id}>
//                             <td>{ model.name }</td>
//                             <td>{ model.manufacturer }</td>
//                          <td>
//                             {model.picture_url && (
//                                 <img
//                                     src={model.picture_url.href}
//                                     alt={`Model ${model.id}`}
//                                     style={{ maxWidth: "100px" }}
//                                 />
//                             )}
//                             </td>
//                         </tr>)
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default VehicleModelList;
