# weatherAvg

Rails API (`backend/`) and React app (`frontend/`).

## Prerequisites

- **Ruby** 2.6.10 (see `backend/.ruby-version`) — use [rbenv](https://github.com/rbenv/rbenv), [asdf](https://asdf-vm.com/), or similar
- **Bundler**
- **PostgreSQL** (running locally)
- **Node.js** and **npm** or **Yarn** (for the frontend)

## Backend (API)

From the repo root:

```bash
cd backend
cp .env.example .env
# Edit .env and set WORLD_WEATHER_ONLINE_API_KEY (from your World Weather Online account).
bundle install
bin/rails db:create db:migrate
bin/rails server
```

The API listens on **port 3000** by default (`http://localhost:3000`).

`dotenv-rails` loads variables from `backend/.env` in development and test. In production, set `WORLD_WEATHER_ONLINE_API_KEY` in the host environment (or your platform’s secret manager).

Production database password can be set with `WEATHER_BACKEND_DATABASE_PASSWORD` (see `config/database.yml`).

## Frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Create React App defaults to port **3000**, which conflicts with Rails. If the dev server asks to use another port (e.g. **3001**), accept it; CORS is configured to allow the browser origin.

Alternatively, force the UI port:

```bash
PORT=3001 npm start
```

## Typical dev flow

1. Start PostgreSQL.
2. Start the backend (`bin/rails server` in `backend/`).
3. Start the frontend (`npm start` in `frontend/`).
4. Open the URL printed by the React dev server (often `http://localhost:3001`).

## Secrets

The weather API key is read from `WORLD_WEATHER_ONLINE_API_KEY` (see `backend/.env.example`). Do not commit `.env` or database passwords; use your deployment platform’s secret storage in production.
