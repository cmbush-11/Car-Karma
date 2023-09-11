import React, { useState, useEffect } from 'react';

function SalespersonHistory() {
    const [salesData, setSalesData] = useState([]);
    const [salespeopleList, setSalespeopleList] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    const loadSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeopleList(data.salespeople);
        } else {
            console.error('An Error Occurred Fetching the Data');
        }
    };

    const loadSales = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';
        const response = await fetch(salesUrl);
        if (response.ok) {
            const data = await response.json();
            setSalesData(data.sales);
            console.log('Sales Data:', data.sales);
        } else {
            console.error('An Error Occurred Fetching the Data');
        }
    };

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        console.log('Selected Salesperson:', value);
        setSelectedSalesperson(value);
    };

    useEffect(() => {
        loadSalespeople();
        loadSales();
    }, []);

    const filteredSales = salesData.filter((sale) => {
        if (!selectedSalesperson) {
            return true;
        }
        return sale.salesperson.id === parseInt(selectedSalesperson);
    });

    return (
        <div className="shadow p-4 mt-4">
            <h1>Salesperson History</h1>
            <select
                onChange={handleSalespersonChange}
                value={selectedSalesperson}
                name="salesperson"
                id="salesperson"
                className="form-select"
            >
                <option value="">All Salespeople</option>
                {salespeopleList.map((salesperson) => (
                    <option key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name} {salesperson.last_name}
                    </option>
                ))}
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Automobile</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale.id}>
                            <td>
                                {sale.salesperson.first_name} {sale.salesperson.last_name}
                            </td>
                            <td>
                                {sale.customer.first_name} {sale.customer.last_name}
                            </td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalespersonHistory;
