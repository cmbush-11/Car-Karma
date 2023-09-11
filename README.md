# CarCar

Team:

* Person 1 - Which microservice?
* Christopher M. Bush - Sales

## How to Run this App

1. Fork the repository located at this URL: https://gitlab.com/eringerber/project-beta

2. Clone the forked repository onto your local computer: git clone https://gitlab.com/eringerber/project-beta.git

3. Run the following commands in your terminal to set the project up and then to get it running:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
4. In the containers tab in Docker Desktop, click the ">" symbol to the left of the underlined name "project-beta" to check that all of the containers are running.

5. Access the project in your web browser at http://localhost:3000/.

## Diagram
 - Put diagram here

## API Documentation

### URLs and Ports

| Service | URL
| ----------- | ----------- |
| Inventory | http://localhost:8100/
| Service | http://localhost:8080/ |
| Sales | http://localhost:8090/ |


### Inventory API (Optional)

#### Manufacturers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all manufacturers | GET | http://localhost:8100/api/manufacturers/
| Show a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/

To list all manufacturers send a GET request to the listed URL.

To see the details of an individual manufacturer, send a GET request to the listed URL, replacing id with that manufacturer's integer ID. The IDs can be found in the list of all manufacturers.

To create a manufacturer change the request format to JSON and send a POST request to the listed URL. The JSON should be in the following format, which will create a manufacturer with the name Volvo.
```
{
	"name": "Volvo",
}
```
To delete a specific manufacturer, send a DELETE request to the same URL you would use to edit or view the manufacturer.

#### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all models | GET | http://localhost:8100/api/models/
| Show a specific model | GET | http://localhost:8100/api/models/id/
| Create a model | POST | http://localhost:8090/api/customers/
| Edit a model | PUT | http://localhost:8100/api/models/id/
| Delete a specific model | DELETE | http://localhost:8100/api/models/id/

To list all models send a GET request to the listed URL.

To see the details of an individual model, send a GET request to the listed URL, replacing id with that model's integer ID. The IDs can be found in the list of all models.

To create a model change the request format to JSON and send a POST request to the listed URL. The JSON should be in the following format, which will create a model with the name XC90 and the a picture located at the listed URL. The manufacturer will be the one in the database with the ID 1. Following the previous example, this model's manufacturer would be Volvo.
```
{
  "name": "XC90",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/2018_Volvo_XC90_2.0.jpg/420px-2018_Volvo_XC90_2.0.jpg",
  "manufacturer_id": 1
}
```
To edit a model, send a PUT request to the listed URl with the ID corresponding to the customer you wish to edit. Change the format to JSON. The JSON should be formatted just the same as when creating a model. Simply replace the old value with the new one.

To delete a specific model, send a DELETE request to the same URL you would use to edit or view the model.


#### Automobiles:

The Automobile model has 5 fields.
Color is a string representing the automobile's color.
Year is a number representing the autombile's year. This must be a number, not a string.
VIN is a string in the form of a 17 character alphanumeric code representing the automobile's unique Vehicle Identification Number. This value must be unique in the database.
Sold is a boolean field in which true means the car has been sold and false means the car has not been sold. New Automobile instances will not be sold by default.
Model is a foregin

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all automobiles | GET | http://localhost:8100/api/automobiles/
| Show a specific automobile | GET | http://localhost:8100/api/automobiles/id/
| Create a automobile | POST | http://localhost:8090/api/automobiles/
| Edit a automobile | PUT | http://localhost:8100/api/automobiles/id/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/id/


To list all automobiles send a GET request to the listed URL.

To see the details of an individual automobile, send a GET request to the listed URL, replacing id with that automobile's integer ID. The IDs can be found in the list of all automobiles.

To create a automobile change the request format to JSON and send a POST request to the listed URL. The JSON should be in the following format, which will create an automobile with the color silver, the year 2023, the VIN PHILADELPHIA76ERS and the model corresponding to the one in the databse with the ID 1. Following the previous examples, this automobile would be a Vovlo XC90.
```
{
  "color": "silver",
  "year": 2023,
  "vin": "PHILADELPHIA76ERS",
  "model_id": 1
}
```
To edit a model, send a PUT request to the listed URl with the ID corresponding to the customer you wish to edit. Change the format to JSON. The JSON should be formatted just the same as when creating a model. Simply replace the old value with the new one.

To delete a specific model, send a DELETE request to the same URL you would use to edit or view the model.


### Sales API
 - Put Sales API documentation here

### Service API
The service API has three models: customer, salesperson, and sale. The user can add, edit, and delete instances of each model as well as view a list of all instances and see the specific details of an individual instance. Instructions for using Insomnia to interact with each model follow:

#### Customers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all customers | GET | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/id/
| Create a customer | POST | http://localhost:8090/api/customers/
| Edit a customer | PUT | http://localhost:8090/api/customers/id/
| Delete a specific customer | DELETE | http://localhost:8090/api/customers/id/


To list all customers send a GET request to the listed URL.

To see the details of an individual customer, send a GET request to the listed URL, replacing id with that customer's integer ID. The IDs can be found in the list of all customers.

To create a customer change the request format to JSON and send a POST request to the listed URL. The JSON will be in the following format, which should create a customer named Reggie Miller with the listed address and phone number.
```
{
	"first_name": "Reggie",
	"last_name": "Miller",
	"address": "300 East Market Street; Indianapolis,",
	"phone_number": "317-867-5309"
}
```
To edit a customer, send a PUT request to the listed URl with the ID corresponding to the customer you wish to edit. Change the format to JSON. The JSON should be formatted just the same as when creating a customer. Simply replace the old value with the new one.

To delete a specific customer, send a DELETE request to the same URL you would use to edit or view the customer.

#### Salespoeople:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salespeople | GET | http://localhost:8090/api/salespeople/
| Show a specific salesperson | GET | http://localhost:8090/api/salespeople/id/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Edit a salesperson | PUT | http://localhost:8090/api/salespeople/id/
| Delete a specific salesperson | DELETE | http://localhost:8090/api/salespeople/id/

To list all salespeople send a GET request to the listed URL.

To see the details of an individual salesperson, send a GET request to the listed URL, replacing id with that salesperson's integer ID. The IDs can be found in the list of all salespeople.

To create a salesperson change the request format to JSON and send a POST request to the listed URL. The JSON should be in the following format, which will create a salesperson named Chester Arthur with the employee id. Note: This is different from the employee's ID in the database.
```
{
  "first_name": "Chester",
  "last_name": "Arthur",
	"employee_id": "POTUS21"
}
```
To edit a salesperson, send a PUT request to the listed URl with the ID corresponding to the salesperson you wish to edit. Change the format to JSON. The JSON should be formatted just the same as when creating a salesperson. Simply replace the old value with the new one.

To delete a specific salesperson, send a DELETE request to the same URL you would use to edit or view the salesperson.

#### Sales:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all sales | GET | http://localhost:8090/api/sales/
| Show a specific sale | GET | http://localhost:8090/api/sales/id/
| Create a sale | POST | http://localhost:8090/api/sales/
| Edit a sale | PUT | http://localhost:8090/api/sales/id/
| Delete a specific sale | DELETE | http://localhost:8090/api/sales/id/

To list all sales send a GET request to the listed URL.

To see the details of an individual sale, send a GET request to the listed URL, replacing id with that sale's integer ID. The IDs can be found in the list of all sales.

To create create a sale change the request format to JSON and send a POST request to the listed URL. The JSON will be in the following format, which will create a sale with the salesperson and customer corresponding to these IDs, the vehicle corresponding to that VIN, and a price of 123,456. Note the VIN must correspond to an automobile in the inventory.
```
{
	"price": "123456",
	"automobile": "3216549870ABCDEFG",
	"salesperson": 2,
	"customer": 5
}
```
To edit a sale, send a PUT request to the listed URl with the ID corresponding to the sale you wish to edit. Change the format to JSON. The JSON will be formatted just the same as when creating a sale. Simply replace the old value with the new one.

To delete a specific sale, send a DELETE request to the same URL you would use to edit or view the sale.

### Sales API
 - Put Sales API documentation here

## Value Objects
The sales microservice has one Value Object, which represents an Automobile and its VIN.
