# Full-Stack React + Express + PostgreSQL App

A full-stack web application with React frontend, Express backend, and PostgreSQL database.

## Project Structure

```
react-users-app/
├── backend/          # Express API with PostgreSQL
│   ├── index.js      # Main server file
│   ├── queries.js    # Database queries
│   └── ...
├── src/              # React frontend
│   ├── components/   # React components
│   ├── services/     # API service
│   └── ...
└── package.json
```

## Features

- ✅ React frontend with Vite
- ✅ Express REST API
- ✅ PostgreSQL database
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ User management interface

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your database credentials:
```
DB_USER=your_username
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

4. Set up database:
```bash
node setup-database.js
```

5. Start the server:
```bash
node index.js
```

Server runs on `http://localhost:3000`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Technologies Used

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Styling:** CSS
