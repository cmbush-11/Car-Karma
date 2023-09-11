import React, {useState, useEffect} from 'react';

function AutoList() {
    const[autos, setAutos] = useState([]);




    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAutos(data.autos)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="shadow p-4 mt-4">
        <h1>Automobile Inventory</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                        return (<tr key={auto.id}>
                            <td>{ auto.vin }</td>
                            <td>{ auto.color }</td>
                            <td>{ auto.year }</td>
                            <td>{ auto.model.name }</td>
                            <td>{ auto.model.manufacturer.name}</td>
                            <td>{ String(auto.sold) }</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default AutoList;
