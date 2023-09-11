CarCar
Team:

* Person 1 - Which microservice?
* Person 2 - Which microservice?

## Design

}

Explain your models and integration with the inventory
microservice, here.

The service microservice has three models, appointments, technician and automobileVO. The poller.py file uses the imported automobileVO model to call data from the inventory api, this allows for the service api to have access to automobile data. AutomobileVO model includes import_href, vin and sold fields. This poller allows for up to date information and connection to the inventory database. The appointments model has date_time, reason, status, vin. customer, vip and technicians (FK). This model is used to allow you to create a new appointment, view current and past appointments as well as update the status of the appointment from created to cancelled or finished. The technician model includes first_name, last_name and employee_id fields and is used for creating a new technician, deleting and viewing technicians.

returns following response:
{
"id": 6,
"date_time": "2024-01-01",
"vin": "5N3AA08D68N901917",
"customer": "leonard",
"technician": {
"first_name": "Sally",
"last_name": "Stewart",
"employee_id": "1"
},
"status": "created",
"reason": "it's broken!",
"vip": false
}
Deleting an appointment takes no body and responds:
{
"deleted": true
}
Setting appointment to cancelled takes no body and responds(based upon appointment id):
{
"id": 6,
"date_time": "2024-01-01T00:00:00+00:00",
"reason": "it's broken!",
"vin": "5N3AA08D68N901917",
"customer": "leonard",
"technician": {
"first_name": "Sally",
"last_name": "Stewart",
"employee_id": "1"
},
"status": "cancelled",
"vip": false
}
Setting appointment to finished takes no body and responds(based upon appointment id):
{
"id": 5,
"date_time": "2023-09-11T10:24:00+00:00",
"reason": "Broke!!!!!!!!!",
"vin": "JH4DA9360PS004131",
"customer": "me!",
"technician": {
"first_name": "Sally",
"last_name": "Stewart",
"employee_id": "1"
},
"status": "finished",
"vip": false
}
Getting list of appointments responds:
{
"appointments": [
{
"id": 1,
"date_time": "2023-09-10T16:55:00+00:00",
"vin": "2FTHF36F8SCA65608",
"customer": "Matilda",
"technician": {
"first_name": "Sally",
"last_name": "Stewart",
"employee_id": "1"
},
"status": "cancelled",
"reason": "idk",
"vip": false
}
​

Sales microservice
Explain your models and integration with the inventory
microservice, here.
