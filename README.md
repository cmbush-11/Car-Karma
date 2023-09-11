CarCar
Team:

* Person 1 - Which microservice?
* Person 2 - Which microservice?

## Design

}

Explain your models and integration with the inventory
microservice, here.

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
