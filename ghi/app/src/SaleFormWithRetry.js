import React, { useEffect, useState } from 'react';

const maxRetries = 5;
const retryDelay = 1000;

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
    let retries = 0;
    let success = false;

    while (retries < maxRetries && !success) {
      try {
        const [autoResponse, customerResponse, salespersonResponse] = await Promise.all([
          fetch('http://localhost:8100/api/automobiles/'),
          fetch('http://localhost:8090/api/customers/'),
          fetch('http://localhost:8090/api/salespeople/'),
        ]);

        if (autoResponse.ok && customerResponse.ok && salespersonResponse.ok) {
          const [autoData, customerData, salespersonData] = await Promise.all([
            autoResponse.json(),
            customerResponse.json(),
            salespersonResponse.json(),
          ]);

          const availableAutos = autoData.autos.filter(auto => !auto.sold);
          console.log("Available Automobiles:", availableAutos);
          setAutomobiles(availableAutos);
          setCustomers(customerData.customers);
          setSalespeople(salespersonData.salespeople);
          success = true;
        } else {
          console.log('Retrying due to non-successful response...');
        }
      } catch (error) {
        console.error('Error Fetching Data', error);
      }

      if (!success) {
        retries++;
        if (retries < maxRetries) {
          console.log(`Retry attempt ${retries} in ${retryDelay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    if (!success) {
      console.error('Max retries reached. Unable to fetch data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.price = price;
    data.automobile = automobile;
    data.salesperson = salesperson;
    data.customer = customer;
    console.log(data);

    const salesUrl = 'http://localhost:8090/api/sales/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const saleResponse = await fetch(salesUrl, fetchOptions);
    if (saleResponse.ok) {
      setPrice('');
      setAutomobile('');
      setSalesperson('');
      setCustomer('');
      setIsSubmitted(true);
    }
  };

  let dropdownClasses = 'form-select';
    return (
        <div className='my-5 container'>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <h1>Add Sale</h1>
                    <form onSubmit={handleSubmit} id='add-sale-form'>
                    <div className='form-floating mb-3'>
                        <input
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            required placeholder='Price' type='text' id='price' name='price' className='form-control'
                        />
                        <label htmlFor='price'>Price</label>
                    </div>
                    <div className='col'>
                        <div className='form-floating mb-3'>
                            <select
                                value={automobile}
                                onChange={(event) => setAutomobile(event.target.value)}
                                name='automobile' id='automobile' className={dropdownClasses} required
                            >
                                <option value=''>Select Automobile</option>
                                {automobiles.map((automobile) => (
                                    <option key={automobile.id} value={automobile.id}>{automobile.vin}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='form-floating mb-3'>
                            <select
                                value={salesperson}
                                onChange={(event) => setSalesperson(event.target.value)}
                                name='salesperson' id='salesperson' className={dropdownClasses} required
                            >
                                <option value=''>Select Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='form-floating mb-3'>
                            <select
                                value={customer}
                                onChange={(event) => setCustomer(event.target.value)}
                                name='customer' id='customer' className={dropdownClasses} required
                            >
                                <option value=''>Select Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <button className='btn btn-lg btn-primary'>Add Sale</button>
                    { isSubmitted && (
                        <div className='alert alert-success mb-0' id='success-message'>
                            <p>Sale Added Successfully</p>
                        </div>
                    )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SaleForm;
