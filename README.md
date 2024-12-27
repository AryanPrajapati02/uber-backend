# Backend Documentation

## Overview

This document provides detailed information about the backend of the Uber-like project, including its setup, functionality, server configuration, routes, and the use of Socket.IO for real-time communication. The backend is built with Node.js, Express.js, and MongoDB, with a focus on scalability, maintainability, and performance.

---

## NPM Packages

The following NPM packages are used in this project:

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **jsonwebtoken**: An implementation of JSON Web Tokens.
- **bcryptjs**: Library to help you hash passwords.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **cors**: Middleware to enable Cross-Origin Resource Sharing (CORS).
- **morgan**: HTTP request logger middleware for Node.js.
- **body-parser**: Node.js body parsing middleware.
- **express-validator**: A set of express.js middlewares that wraps validator.js validator and sanitizer functions.
- **socket.io**: for realtime communication.



### Installation

To install these packages, run the following command:

```bash
npm install express mongoose jsonwebtoken bcryptjs dotenv cors morgan body-parser express-validator 
```

## Project Setup

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)

### Installation

To install the required dependencies, navigate to the backend folder and run:

```bash
npm install
```

### Starting the Server

To start the server, use the following command:

```bash
npm run start
```

For development, you can use:

```bash
npm run dev
```

This will start the server with hot-reloading enabled using `nodemon`.

### Environment Variables

Create a `.env` file in the root of the backend folder and include the following variables:

```env
PORT=<server_port>
DATABASE_URL=<your_database_connection_url>
JWT_SECRET=<your_jwt_secret>
GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
SOCKET_IO_SERVER_URL=<socket_io_server_url>
```

---

## Project Structure

```plaintext
backend/
├── .env
├── .gitignore
├── package.json
├── server.js
├── socket.js
├── controllers/
│   ├── authController.js
│   ├── rideController.js
│   ├── userController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
├── models/
│   ├── Ride.js
│   ├── User.js
├── routes/
│   ├── authRoutes.js
│   ├── rideRoutes.js
│   ├── userRoutes.js
├── utils/
│   ├── database.js
│   ├── logger.js
├── tests/
│   ├── auth.test.js
│   ├── rides.test.js
```

---

## Key Features

### Real-Time Features with Socket.IO

The backend integrates Socket.IO for real-time communication, supporting:

- **Real-Time Ride Updates:** Instantly notify users and drivers about ride status changes such as acceptance, cancellation, and completion.
- **Live Location Tracking:** Stream real-time location data from drivers to users for active rides.
- **Driver Availability Monitoring:** Continuously update driver availability and location for efficient ride allocation.

Socket.IO setup is centralized in `socket.js` and integrated with the server middleware. Core events include:

- **`rideRequest`**: A user requests a ride.
- **`rideAccepted`**: A driver accepts a ride request.
- **`locationUpdate`**: Drivers send periodic location updates during active rides.
- **`rideCompleted`**: The ride is marked as completed and relevant users are notified.

### Robust API Routes

#### Authentication Routes (`/api/auth`)

- **POST `/login`**: Authenticate users and return a JWT.
  - **Request Body:** `{ email, password }`
  - **Response:** `{ token, user }`

- **POST `/register`**: Register a new user.
  - **Request Body:** `{ name, email, password }`
  - **Response:** `{ message, user }`

#### User Management Routes (`/api/users`)

- **GET `/profile`**: Retrieve user profile details (requires authentication).
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Response:** `{ user }`

- **PUT `/profile`**: Update user profile information.
  - **Request Body:** `{ name, phone, email }`
  - **Response:** `{ message, updatedUser }`

#### Ride Management Routes (`/api/rides`)

- **POST `/create`**: Submit a new ride request.
  - **Request Body:** `{ pickupLocation, dropoffLocation, userId }`
  - **Response:** `{ rideDetails }`

- **GET `/active`**: Fetch all active ride requests.
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Response:** `{ activeRides }`

- **PUT `/update/:rideId`**: Update the status of a specific ride.
  - **Request Body:** `{ status }`
  - **Response:** `{ message, updatedRide }`

### Error Handling and Middleware

- **Authentication Middleware:** Protects sensitive routes by verifying JWTs. Unauthorized access attempts return a `401 Unauthorized` error.
- **Error Middleware:** Centralized handling of all API errors, returning consistent responses with logs for debugging.

### Database Management

The `database.js` utility ensures a stable connection to MongoDB using `mongoose`. It features error-handling mechanisms and retry logic for robust operation.

---

## Utilities

### Logger Utility

The `logger.js` utility provides a structured logging system using `winston`. It tracks server events, errors, and application flow with configurable levels.

---

## Testing

The project includes automated tests to validate API functionality, covering key features such as authentication, ride management, and error handling. 

### Running Tests

Execute tests with:

```bash
npm run test
```

Tests are structured under the `tests/` directory:

- `auth.test.js`: Verifies login and registration flows.
- `rides.test.js`: Tests ride creation, updates, and retrieval.

---

## Deployment Notes

To deploy the backend:

1. Ensure all dependencies are installed and configured.
2. Verify the `.env` file includes production-ready values.
3. Use a process manager like **PM2** for server stability.

---

## Final Notes

- Database: Make sure MongoDB is running and accessible.
- Security: Use strong JWT secrets and secure database credentials in the `.env` file.
- Scalability: Consider using Redis for caching and message brokering to enhance real-time features.

Feel free to extend or customize the backend as needed for your project requirements.

