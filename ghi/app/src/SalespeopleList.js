import React from 'react';

function SalespeopleList(props) {

    const deleteSalesperson = async(salesperson) => {
        try {
            const deleted = salesperson.id
            const salespersonUrl = `http://localhost:8090/api/salespeople/${deleted}/`;
            const fetchOptions = {
                method: "delete",
            };
            const response = await fetch(salespersonUrl, fetchOptions);
            if (response.ok) {
                window.location.reload(false);
            };
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
                {props.salespeople.map(salesperson => {
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
