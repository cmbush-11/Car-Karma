import React, {useState, useEffect} from 'react';

function VehicleModelList() {
    const[models, setModels] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setModels(data.models)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log('These are the models:', models);

    return (
        <div className="shadow p-4 mt-4">
        <h1>Vehicle Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (<tr key={model.id}>
                            <td>{ model.manufacturer }</td>
                            <td>{ model.name }</td>
                            <td>{ model.picture_url }</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default VehicleModelList;
