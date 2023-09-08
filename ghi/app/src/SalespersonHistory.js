import React, { useState, useEffect } from 'react';


function SalespersonHistory() {
    const [salesData, setSalesData] = useState([]);
    const [salespeopleList, setSalespeopleList] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    const loadSalespeople = async() => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSalespeopleList(data.salespeople);
        } else {
            console.error('An Error Occured Fetching the Data')
        }
    }

    const loadSales = async()  => {
        const salespeopleUrl = 'http://localhost:8090/api/sales/'
        const response = await fetch(salespeopleUrl)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSalesData(data.sales)
        } else {
            console.error('An Error Occured Fetching the Data')
        }
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSelectedSalesperson(value);
        loadSalespeople();
    }

    const filterSales = (selectedSalesperson, salesData) => {
        if(!selectedSalesperson) {
            return salesData;
        }
        return salesData.filter(sale =>
            Object.values(sale).some(value => {
                if (typeof value === 'string') {
                    return value.includes(selectedSalesperson);
                } else {
                    const stringValue = value.toString();
                    return stringValue.includes(selectedSalesperson);
                }
            })
        );
    };

    const salesPerSalesperson = filterSales(selectedSalesperson, salesData)

    useEffect(() => {
        loadSalespeople();
        loadSales();
    }, []);

    const selectedSalespersonObj = salespeopleList.find(
        (salesperson) => salesperson.id === selectedSalesperson
    );

    return (
        <div className="shadow p-4 mt-4">
            <h1>Salesperson History</h1>
            <select
                onChange={handleSalespersonChange}
                value={parseInt(selectedSalesperson) ? 0 : selectedSalesperson}
                name="salesperson"
                id="salesperson"
                className="form-select"
            >
                <option value="0">
                    {selectedSalespersonObj
                        ? `${selectedSalespersonObj.first_name} ${selectedSalespersonObj.last_name}`
                        : 'Select Salesperson'}
                </option>
                {salespeopleList.map((salesperson) => {
                    return (
                        <option key={salesperson.id} value={salesperson.id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    );
                })}
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
                {salesPerSalesperson.map((sale) => {
                    return (
                    <tr key={ sale.id }>
                        <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                        <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                        <td>{ sale.automobile.vin }</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

            );

            }

export default SalespersonHistory;


 // useEffect (() => {
    //     const salespersonUrl = `http://localhost:8090/api/salespeople/${selectedSalesperson.id}/`
    //     if (selectedSalesperson) {
    //         fetch(salespersonUrl)
    //             .then(response => {
    //                 if (!response.ok) {
    //                     throw new Error(`Network response was not ok: ${response.status}`)
    //                 }
    //                 return response.json();
    //             })
    //             .then(info => {
    //                 console.log(info)
    //                 setSalesData(info);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching sales:', error);
    //             });
    //     }
    // }, [selectedSalesperson]);



//     return (
//         <div className='shadow p-4 mt-4'>
//             <h1>Salesperson History</h1>
//             <label>Select Salesperson:</label>
//                 <select value={selectedSalesperson} onChange={(event) => setSelectedSalesperson(event.target.value)}>
//                     <option value="">All</option>
//                     {salespeopleList.map(salesperson => (
//                         <option key={salesperson.id} value={salesperson.id}>
//                             {salesperson.first_name}
//                         </option>
//                     ))}
//                 </select>
//                 <ul>
//                     {salesData.map(sale => (
//                         <li key={sale.id}>{sale.automobile.vin} - {sale.price}</li>
//                     ))}
//                 </ul>
//             </div>
//         );
// }
