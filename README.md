# Bookstore App

An API built with **Node.js**, **Express**, and **MongoDB** to manage users, books, and orders. It supports user authentication, admin access, book management, and placing orders with shipping and payment details.

---

## Features

- User registration and login (JWT-based authentication)
- Password hashing with bcrypt
- Role-based access (user/admin)
- Book CRUD operations
- Order placement with shipping address and payment method
- MongoDB timestamps for records

---


---

## API Endpoints

### Auth Routes

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login and get token  |

### Book Routes

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| GET    | `/api/books`         | Get all books           |
| GET    | `/api/books/:id`     | Get single book by ID   |
| POST   | `/api/books`         | Add book (admin only)   |
| PUT    | `/api/books/:id`     | Update book (admin)     |
| DELETE | `/api/books/:id`     | Delete book (admin)     |

### Order Routes

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| POST   | `/api/orders/place`  | Place a new order   |

#### Order Placement Body Example

```json
{
  "books": [
    {
      "book": "64d24f67abc12345abc67890",
      "quantity": 2,
      "priceAtPurchase": 399
    }
  ],
  "shippingAddress": {
    "street": "456 Main Road",
    "city": "Mumbai",
    "state": "MH",
    "zip": "400001",
    "country": "India"
  },
  "totalAmount": 798,
  "paymentMethod": "COD"
}


