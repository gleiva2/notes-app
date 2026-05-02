# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
# Install all dependencies (monorepo)
npm install

# Start both frontend and backend concurrently
npm run dev

# Start individual services
npm run start-frontend    # Vue dev server at http://localhost:8080
npm run start-backend     # Express server at http://localhost:3002

# Lint frontend code
npm run lint --workspace client

# Build frontend for production
npm run build --workspace client
```

## Testing

No testing framework is currently configured. There are no unit tests, integration tests, or e2e tests in this codebase. If tests are needed, they would need to be added from scratch.

## Architecture

This is a monorepo (npm workspaces) with two packages:

- **client/**: Vue 2.7 + Vuetify 2 frontend
- **api/**: Express.js + MongoDB backend

### Backend (api/)

Entry point: `server.js` - Express app connecting to MongoDB via Mongoose

Key files:
- `models/note.model.js` - Mongoose schema (title, body, timestamps)
- `routes/notes.routes.js` - CRUD endpoints mounted at `/notes`

Environment: Copy `api/.env.example` to `api/.env`. Requires MongoDB on `localhost:27017`.

### Frontend (client/)

Entry point: `src/main.js` - Vue app with Vuetify and Vue Router

Components:
- `NoteAdd.vue` - Create new notes (default route at `/`)
- `NoteView.vue` - View/edit individual note (`/:id`)
- `NotesList.vue` - List all notes

Routes defined in `src/routes/index.js`. API calls use Axios to `localhost:3002/notes`.

**Path alias**: `@/*` maps to `src/*` in imports (e.g., `import Foo from '@/components/Foo.vue'`)

**Global utilities**:
- `this.moment` - Moment.js available on Vue prototype for date formatting (or just `moment` in templates)
- Vuetify components available globally (no explicit imports needed)

**State management**: Component-level only (no Vuex/Pinia). Components communicate via root event bus.

## Code Patterns

### Backend Error Handling
All route handlers use try-catch with error response format:
```javascript
try {
  // ... operation
} catch (error) {
  res.status(statusCode).json({ message: error.message });
}
```
- GET routes return `500` for errors
- POST/DELETE/PATCH routes return `400` for errors

### Frontend State Synchronization
After any note mutation (create/update/delete), emit an event to refresh the notes list:
```javascript
this.$root.$emit('updateNotesList');
```
The `NotesList` component listens for this event and refetches all notes.

### Mongoose Schema Transforms
The Note schema automatically converts `_id` to `id` in JSON responses via a `toJSON` transform. Always use `id` (not `_id`) when working with note objects in the frontend.

## Note Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Note title |
| `body` | String | No | Note content |
| `createdAt` | Date | Auto | Timestamp when created |
| `updatedAt` | Date | Auto | Timestamp when last modified |
| `id` | String | Auto | MongoDB `_id` mapped to `id` in JSON |

## API Endpoints

Base: `http://localhost:3002/notes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all notes |
| GET | `/notes/:id` | Get note by ID |
| POST | `/notes` | Create note |
| PATCH | `/notes/:id` | Update note |
| DELETE | `/notes/:id` | Delete note |

## Known Issues

- **Hardcoded API URLs**: Frontend API calls are hardcoded to `http://localhost:3002`. No environment-based configuration exists.
- **Event emission required**: Forgetting to emit `updateNotesList` after note mutations will leave the UI out of sync.
- **Unreachable code**: `api/routes/notes.routes.js` lines 71-72 contain unreachable code after a return statement.
