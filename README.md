# Notes App

A full-stack note-taking application with a Vue.js frontend and Express/MongoDB backend, managed as a monorepo with npm workspaces.

## Tech Stack

### Frontend (client)
- **Framework:** Vue 2.7
- **UI Library:** Vuetify 2
- **HTTP Client:** Axios
- **Date Formatting:** Moment.js

### Backend (api)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM

## Project Structure

```
notes-app/
├── api/                 # Express.js backend
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
├── client/              # Vue.js frontend
│   └── src/
│       ├── components/  # Vue components
│       └── routes/      # Vue Router config
└── package.json         # Workspace configuration
```

## Quick Start

### Prerequisites
- Node.js
- MongoDB running locally on port 27017

### Installation

```bash
# Install all dependencies (root, client, api)
npm install
```

### Running the Application

```bash
# Start both frontend and backend concurrently
npm run dev

# Frontend: http://localhost:8080
# Backend:  http://localhost:3000
```

### Individual Services

```bash
# Start only frontend
npm run start-frontend

# Start only backend
npm run start-backend
```

## API Endpoints

Base URL: `http://localhost:3000/notes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all notes |
| GET | `/notes/:id` | Get note by ID |
| POST | `/notes` | Create a new note |
| PATCH | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

### Request/Response Examples

**Create Note (POST /notes)**
```json
// Request
{
  "title": "My Note",
  "body": "Note content here"
}

// Response
{
  "id": "...",
  "title": "My Note",
  "body": "Note content here",
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Database Schema

### Note Collection

```javascript
{
  title: String,      // Required
  body: String,       // Optional
  createdAt: Date,    // Auto-generated
  updatedAt: Date     // Auto-generated
}
```

## Environment Setup

Copy the example file and configure:

```bash
cp api/.env.example api/.env
```

### MongoDB Setup

By default, the backend connects to:
```
mongodb://localhost:27017/notes_db
```

You can override this by setting `MONGODB_URI` in `api/.env`.

Ensure MongoDB is running before starting the backend.

## Workspace Commands

```bash
# Run client scripts
npm run <script> --workspace client

# Run api scripts
npm run <script> --workspace api

# Examples
npm run build --workspace client
npm run dev --workspace api
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both services concurrently |
| `npm run start-frontend` | Start Vue dev server only |
| `npm run start-backend` | Start Express server only |
