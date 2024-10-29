# Book Management App Backend

This repository contains the backend for a Book Management App, built using Node.js, Express.js, Mongoose, and MongoDB. This backend API allows for managing books, including adding, updating, deleting, and retrieving book information.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **CRUD Operations**: Manage books with Create, Read, Update, and Delete functionality.
- **RESTful API**: Provides a RESTful API for handling book management.
- **Data Validation**: Validates data using Mongoose models.
- **Error Handling**: Consistent error responses for ease of debugging.

## Tech Stack

- **Node.js**: JavaScript runtime for building fast and scalable server applications.
- **Express.js**: Web framework for Node.js to manage routing and middleware.
- **MongoDB**: NoSQL database to store book information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-management-backend.git
   cd book-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

## Configuration

1. Rename the `.env.example` file to `.env`.
2. Update the MongoDB URI in the `.env` file.

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

## Usage

Run the server in development mode:
```bash
npm run dev
```

The server will be accessible at `http://localhost:5000`.

## API Endpoints

### Books

| Method | Endpoint          | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/books`      | Get all books            |
| GET    | `/api/books/:id`  | Get a book by ID         |
| POST   | `/api/books`      | Add a new book           |
| PUT    | `/api/books/:id`  | Update a book by ID      |
| DELETE | `/api/books/:id`  | Delete a book by ID      |

### Example Book Object

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "publishedYear": 2023,
  "genre": "Fiction",
}
```
