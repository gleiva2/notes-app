# Notes App

This repository is a monorepo containing both the frontend (Vue.js) and backend (Node.js/Express) for the Notes App, managed with npm workspaces.

## Structure

```
notes-app/
├── api/      # Express.js backend
├── client/   # Vue.js frontend
├── package.json (workspaces config)
└── ...
```

## Getting Started

### Install dependencies (all workspaces)
```bash
npm install
```
This will install dependencies for both `api` and `client`.

### Run both client and API concurrently (development)
```bash
npm run dev
```
- Starts the backend (`api`) with hot reload
- Starts the frontend (`client`) with hot reload

### Run only the client
```bash
npm run start-frontend
```

### Run only the API
```bash
npm run start-backend
```

## Workspace Details

### client (Vue.js)
- Located in `client/`
- Usual Vue CLI scripts available (`serve`, `build`, `lint`)
- To run scripts individually:
  ```bash
  npm run <script> --workspace client
  ```
  Example:
  ```bash
  npm run build --workspace client
  ```

### api (Express.js)
- Located in `api/`
- Dev server with nodemon for hot reload
- To run scripts individually:
  ```bash
  npm run <script> --workspace api
  ```
  Example:
  ```bash
  npm run dev --workspace api
  ```

## MongoDB Setup
- Ensure a MongoDB server is running locally for the backend to connect.
- Default connection settings are in `api/`.

## Additional Notes
- Uses `concurrently` to run both servers in development.
- All workspace management is handled via npm workspaces.

---
