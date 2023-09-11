import React, { useEffect, useState } from 'react';

function SaleForm(props) {
    const[automobile, setAutomobile] = useState('');
    const[salesperson, setSalesperson] = useState('');
    const[customer, setCustomer] = useState('');
    const[price, setPrice] = useState('');
    const[automobiles, setAutomobiles] = useState([]);
    const[salespeople, setSalespeople] = useState([]);
    const[customers, setCustomers] = useState([]);
    const[isSubmitted, setIsSubmitted] = useState(false);

    const getAutomobiles = async() => {
        const response = await fetch('http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const data = await response.json();
            const availableAutos = data.autos.filter(auto => !auto.sold);
            setAutomobiles(availableAutos);
        }
    }

    const getCustomers = async() => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    const getSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if(response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }


    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {}

        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        console.log("Stringified Deets!", JSON.stringify(data));


        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);

            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
            setIsSubmitted(true);
        }
    }

    useEffect(() => {
        getAutomobiles();
        getCustomers();
        getSalespeople();
      }, []);


    return(
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Enter a Sale</h1>
                <form onSubmit={handleSubmit} id="create-sales-form">
                    <div className="form-floating mb-3">
                        <select
                            onChange = {handleAutomobileChange}
                            value ={automobile}
                            placeholder ="Automobile"
                            required type ="text"
                            name ="automobile"
                            id ="automobile"
                            className="form-select"
                        >
                        <option value ="">Select Automobile</option>
                        {automobiles.map(autos => {
                            return(
                                <option value = {autos.vin} key={autos.vin}>
                                    {autos.vin}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange = {handlePriceChange}
                            value = {price}
                            placeholder ="price"
                            required type ="text"
                            name ="price"
                            id ="price"
                            className="form-control"
                        />
                        <label htmlFor="Price">Price</label>
                    </div>
                    <div className="mb-3">
                        <select
                            onChange = {handleSalespersonChange}
                            value ={salesperson}
                            required name ="Salesperson"
                            className ="form-select"
                        >
                        <option value ="">Select Salesperson</option>
                        {salespeople.map(salesperson => {
                            return(
                                <option key = {salesperson.id} value={salesperson.id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            onChange = {handleCustomerChange}
                            value = {customer}
                            required name ="customer"
                            className ="form-select"
                        >
                        <option value ="">Select Customer</option>
                        {customers.map(customer => {
                            return(
                                <option key = {customer.id} value={customer.id}>
                                    {customer.first_name} {customer.last_name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                        <button className='btn btn-lg btn-primary'>Add Sale</button>
                        { isSubmitted && (
                            <div className='alert alert-success mb-0' id='success-message'>
                                <p>Sale Added</p>
                            </div>
                        )}
                    </form>
                </div>
                </div>
            </div>

      );


}

export default SaleForm;
