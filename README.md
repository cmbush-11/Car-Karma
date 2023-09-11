# CarCar

CarCar is you one stop solution for managing your auto dealership. It contains separate microservices for your inventory, your service side, and your sales side. With it you can manage your employees, schedule service appointments, log sales, and track your inventory.

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
| Get a specific manufacturer | http://localhost:8080/ |
| Sales | http://localhost:8090/ |
| Delete a specific manufacturer | DELETE |

: 
: 
: 

### Inventory API (Optional)
 - Put Inventory API documentation here. This is optional if you have time, otherwise prioritize the other services.

### Service API
 - Put Service API documentation here

### Sales API
 - Put Sales API documentation here

## Value Objects
The sales microservice has one Value Object, which represents an Automobile and its VIN
