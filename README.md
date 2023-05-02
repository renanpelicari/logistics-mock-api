# Logistics Mock API

This is a mocked logistics API that provides some endpoints for testing and proof-of-concept purposes.
The API contains fake data and can simulate random timeouts on some requests.

So, you will observe that this project is not following the best practices (at this first moment), once the only purpose is publish a docker image that will be useful for another POC on my [GitHub profile](https://github.com/renanpelicari).

For more information about this project and the repository as well, ou can check it through this link: [https://github.com/renanpelicari/logistics-mock-api](https://github.com/renanpelicari/logistics-mock-api)

---

## Getting Started

You have different ways to use this:

### Running local

To use this API locally, you need to have Node.js installed on your machine. Clone this repository and run the following command:

````shell
npm install
````

Then, you can start the server by running:
````shell
npm start
````

The server will start running on [http://localhost:4000](http://localhost:4000)


### Using the image from docker hub

You can use the image from docker hub [https://hub.docker.com/r/renanpelicari/logistics-mock-api](https://hub.docker.com/r/renanpelicari/logistics-mock-api)

```shell
docker pull renanpelicari/logistics-mock-api
docker run -p 4000:4000 --restart=on-failure --name logistics-mock-api -d renanpelicari/logistics-mock-api
```
Then:



### ... via `docker-compose` or `docker stack deploy`

```yaml
version: '3.8'

services:
    logistics-mock-api:
        image: renanpelicari/logistics-mock-api:latest
        ports:
        - 4000:4000
```


### Use the Docker image from this repository

To use the docker image of this api, you need to have docker installed on your machine. Clone this repository and run the following command:

```shell
docker build -t mocked-logistics-api .
```

Then, you can start the docker by running:
```shell
docker run -p 4000:4000 --restart=on-failure mocked-logistics-api
```

The server will start running on [http://localhost:4000](http://localhost:4000)

---

## Endpoints

### GET /order/:id/pricing?currencyCode=?
Get the pricing information for an order. You can specify the currency code as a query parameter. If no currency code is specified, an error will be thrown.

Parameters:

- id (required) - The ID of the order.
- currencyCode (required) - The currency code for the price.

Request

```shell
curl --location 'http://127.0.0.1:4000/order/109347263/package-types'
```

Response

```json
{
    "orderId": "109347263",
    "types": [
        "BOX",
        "BOX",
        "PALLET",
        "ENVELOPE"
    ]
}
```

### GET /order/:id/status

Get the status of an order.

Parameters:

- id (required) - The ID of the order.

Example of usage:

Request

```shell
curl --location 'http://127.0.0.1:4000/order/109347263/status'
```

Response

```json
{
    "orderId": "109347263",
    "status": "DELIVERED"
}
```

### GET /order/:id/package-types

Get the package types for an order.

Parameters:

- id (required) - The ID of the order.

Request

```shell
curl --location 'http://127.0.0.1:4000/order/109347263/pricing?currencyCode=BRL'
```

Response

```json
{
    "orderId": "109347263",
    "currencyCode": "BRL",
    "price": 48.37
}
```

Error Handling:

If an invalid id or currencyCode is provided, a 404 error will be returned with a message indicating the error.

## Simulated Timeoutsthroug
In this repository, also has the postman collection for all those 3 endpoints with sample of usage.

---

## Author

Renan Peliçari Rodrigues

[renanpelicari@gmail.com](mailto:renanpelicari@gmail.com)

https://www.linkedin.com/in/renanpelicari/

https://github.com/renanpelicari
