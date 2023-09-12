import React,{ useEffect, useState } from 'react';

function SaleList() {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
    }
}

useEffect(() => {
    fetchData()
  }, []);

const deleteSale = async(sale) => {
    try {
        const deleted = sale.id
        const saleUrl = `http://localhost:8090/api/sales/${deleted}/`;
        const fetchOptions = {
            method: "delete",
        };
        const response = await fetch(saleUrl, fetchOptions);
    }
    catch (e) {
        console.log(e)
    }
}

return (
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
            {sales.map((sale) => {
            return (
                <tr key={sale.id}>
                    <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                    <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.price }</td>
                <td><button onClick={() => deleteSale(sale)}>Delete</button></td>
                </tr>
            );
            })}
        </tbody>
    </table>
);
}

export default SaleList;
