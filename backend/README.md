# Node.js REST API with PostgreSQL

A RESTful API built with Node.js, Express, and PostgreSQL.

## Features

- ✅ GET `/users` - Get all users
- ✅ GET `/users/:id` - Get user by ID
- ✅ POST `/users` - Create a new user
- ✅ PUT `/users/:id` - Update a user
- ✅ DELETE `/users/:id` - Delete a user

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd node-api-postgres
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=your_password
DB_PORT=5432
```

4. Create the database table:
```bash
npm run setup-db
```

5. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Get all users
```bash
GET http://localhost:3000/users
```

### Get user by ID
```bash
GET http://localhost:3000/users/1
```

### Create a user
```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Update a user
```bash
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Delete a user
```bash
DELETE http://localhost:3000/users/1
```

## Testing

### Test database connection:
```bash
npm run test-db
```

## Project Structure

```
node-api-postgres/
├── index.js              # Express server setup
├── queries.js            # Database queries
├── database.sql          # Database schema
├── setup-database.js     # Database setup script
├── test-db.js            # Database connection test
├── package.json          # Dependencies
└── .env                  # Environment variables (not in git)
```

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- dotenv (Environment variables)

## License

MIT




