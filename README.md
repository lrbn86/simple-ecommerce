# Simple Ecommerce

This project is a RESTful API for a ecommerce platform

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [License](#license)

## Features

- User Service - handle user registration, authentication, and profile management
- Product Catalog Service - manage product listings, categories, and inventory
- Shopping Cart Service - manage users' shopping carts, including adding/removing items and updating quantities
- Order Service - processes orders, including placing orders, tracking order status, managing order history
- Payment Service - handles payment processing, integrating with external payment gateways
- Notification Service - sends email and SMS notifications for various events

## Getting Started

- Contribute by creating issues and/or pull requests
- See `package.json` for more project details such as script commands and dependencies

## API Documentation

This a [RESTful API](https://restfulapi.net/). It works only with JSON when accepting requests and returning responses. It also uses standard HTTP response codes, authentication, and verbs.

### Authentication & Authorization

This API uses JWT to authenticate clients and role-based access control (RBAC) to authorize clients on certain actions.

### Endpoints

| Endpoint                        | Method | Description            | Parameters                                  | Example Responses                                             |
| ------------------------------- | ------ | ---------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| /v1/register                    | POST   | Create an account      | {"email" : "string", "password" : "string"} | {"id" : "string", "email" : "string", "createdAt" : "string"} |
| /v1/login                       | POST   | Login to an account    | {"email" : "string", "password" : "string"} | {"id" : "string", "email" : "string", "createdAt" : "string"} |
| /v1/products                    | POST   | Create product         |                                             |                                                               |
| /v1/products                    | GET    | Get products           |                                             |                                                               |
| /v1/products/:productId         | GET    | Get a product          |                                             |                                                               |
| /v1/products/:productId         | PUT    | Update a product       |                                             |                                                               |
| /v1/products/:productId         | DELETE | Delete a product       |                                             |                                                               |
| /v1/cart                        | POST   | Create cart            |                                             |                                                               |
| /v1/cart/:cartId                | GET    | Get a cart             |                                             |                                                               |
| /v1/cart/:cartId                | DELETE | Clear a cart           |                                             |                                                               |
| /v1/cart/:cartId/:items         | POST   | Add item to cart       |                                             |                                                               |
| /v1/cart/:cartId/:items/:itemId | PUT    | Update item in cart    |                                             |                                                               |
| /v1/cart/:cartId/:items/:itemId | DELETE | Delete item in cart    |                                             |                                                               |
| /v1/orders                      | POST   | Create order           |                                             |                                                               |
| /v1/orders                      | GET    | Get orders             |                                             |                                                               |
| /v1/orders/:orderId             | GET    | Get a order            |                                             |                                                               |
| /v1/orders/:orderId             | PUT    | Update a order         |                                             |                                                               |
| /v1/orders/:orderId             | DELETE | Delete a order         |                                             |                                                               |
| /v1/payments                    | POST   | Create payment         |                                             |                                                               |
| /v1/payments                    | GET    | Get payments           |                                             |                                                               |
| /v1/payments/:paymentId         | GET    | Get payment            |                                             |                                                               |
| /v1/payments/webhook            | POST   | Setup payments webhook |                                             |                                                               |

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See [LICENSE](https://github./com/project-name/blob/HEAD/LICENSE) for the full license text.
