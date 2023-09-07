import React, {useState, useEffect} from 'react';

function SalespeopleList() {
    const[salespeople, setSalespeople] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteSalesperson = async(salesperson) => {
        try {
            const deleted = salesperson.id
            const salespersonUrl = `http://localhost:8090/api/salespeople/${deleted}/`;
            const fetchOptions = {
                method: "delete",
            };
            const response = await fetch(salespersonUrl, fetchOptions);
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(salesperson => {
                    return (<tr key={salesperson.id}>
                        <td>{ salesperson.first_name }</td>
                        <td>{ salesperson.last_name }</td>
                        <td>{ salesperson.employee_id }</td>
                        <td><button onClick={() => deleteSalesperson(salesperson)}>Delete</button></td>
                    </tr>)
                })}
            </tbody>
        </table>
    )

}

export default SalespeopleList;
