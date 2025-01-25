# MagicShelf backend

## Installation

This document explain how to setup the project locally.

### Prerequisites

- Node.js (Version 20.18.0 or higher)
- NPM
- Database setup (XAMPP Mysql)

### Instruction

- Navigate to the backend directory:

```sh
cd backend
```

- Install dependencies:

```sh
npm install
```

- Configure the .env file:

```makefile
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=magic_shelf
JWT_SECRET=supersecretkey
PORT=3000
```

- Start the application:

```sh
npm start
```

- Test the application at: <http://localhost:3000>

## Project Structure

```text
/backend
  |-- /db
  |     |-- /sql           # Database DDL query
  |-- /src
  |     |-- /config        # Configuration file
  |     |-- /routes        # API route definitions
  |     |-- /controllers   # Route handlers
  |     |-- /models        # Database models
  |     |-- /middleware    # Custom middleware
  |     |-- /utils         # Utilities and helpers
  |     |-- app.js         # Start point
  |     |-- swagger.js     # Swagger docs configuration
  |-- .gitignore           # Ignored files from git
  |-- .env                 # DB and auth sensitive info
  |-- package.json         # Dependency configuration
  |-- package-lock.json    # Dependency tree
  |-- README.md
```

## API Reference

For all API reference visit the swagger documentation at: <http://localhost:3000/api-docs>
