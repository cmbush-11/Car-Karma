import React, { useEffect, useState }  from 'react';


function SaleForm() {

    const [price, setPrice] = useState('');
    const [automobile, setAutomobile] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]);
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchData = async () => {
        try {
            const [autosResponse, customerResponse, salespeopleResponse] = await Promise.all([
                fetch('http://localhost:8100/api/automobiles/'),
                fetch('http://localhost:8090/api/customers/'),
                fetch('http://localhost:8090/api/salespeople/'),
            ]);

            if (autosResponse.ok) {
              const autosData = await autosResponse.json();
              const availableAutos = autosData.autos.filter(auto => !auto.sold);
              setAutomobiles(availableAutos);
            }

            if (customerResponse.ok) {
                const customersData = await customerResponse.json();
                setCustomers(customersData.customers);
            }

            if (salespeopleResponse.ok) {
                const salespeopleData = await salespeopleResponse.json();
                setSalespeople(salespeopleData.salespeople);
            }
        } catch (error) {
            console.error('Error Fetching Data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.autmobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;


        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const saleResponse = await fetch(saleUrl, fetchOptions);
            if (saleResponse.ok) {
                setPrice('');
                setAutomobile('');
                setSalesperson('');
                setCustomer('');
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Error Submitting Sale:', error);
        }
    };

    let dropdownClasses = 'form-select';

    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Add Sale</h1>
                        <form onSubmit={handleSubmit} id="add-sale-form">
                        <div className='form-floating mb-3'>
                            <input
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required placeholder='Price' type='text' id='Price' name='Price' className='form-control'
                            />
                            <label htmlFor='Price'>Price</label>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <select
                                    value={automobile}
                                    onChange={(event) => setAutomobile(event.target.value)}
                                    name='automobile' id='automobile' className={dropdownClasses} required>
                                    <option value=''>Select Automobile</option>
                                    {automobiles.map((automobile) => (
                                        <React.Fragment key={automobile.href}>
                                            <option value={automobile.href}>{automobile.vin}</option>
                                        </React.Fragment>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <select
                                    value={customer}
                                    onChange={(event) => setCustomer(event.target.value)}
                                    name='customer' id='customer' className={dropdownClasses} required>
                                    <option value=''>Select Customer</option>
                                    {customers.map((customer) => (
                                        <React.Fragment key={customer.href}>
                                        <option value={customer.href}>{customer.last_name}</option>
                                        </React.Fragment>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <select
                                    value={salesperson}
                                    onChange={(event) => setSalesperson(event.target.value)}
                                    name='salesperson' id='salesperson' className={dropdownClasses} required>
                                    <option value=''>Select Salesperson</option>
                                    {salespeople.map((salesperson) => (
                                    <React.Fragment key={salesperson.href}>
                                        <option value={salesperson.href}>{salesperson.employee_id}</option>
                                    </React.Fragment>
                                    ))}
                                </select>
                            </div>
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
        </div>
    );
 }

 export default SaleForm;
