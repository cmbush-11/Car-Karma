import React, {useState, useEffect} from 'react';

function ManufacturerList() {
    const[manufacturers, setManufacturers] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="shadow p-4 mt-4">
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (<tr key={manufacturer.id}>
                            <td>{ manufacturer.name }</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ManufacturerList;
