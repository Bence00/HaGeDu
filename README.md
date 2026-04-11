# HaGeDu — Budapest Event Aggregator

Aggregates ~40 Budapest venues across Tixa, TicketSwap, and Bandsintown into a single web app.

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Backend  | Node.js + Express                       |
| Database | MySQL 8                                 |
| Auth     | JWT (jsonwebtoken + bcryptjs)           |
| Frontend | Vue.js 3, Vue Router, Axios, Vite *(planned)* |

## Quick Start (Docker)

**Requirements:** Docker + Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

- Backend: http://localhost:3000
- Database: localhost:3306

### Seed the database

After containers are up:

```bash
docker compose exec backend node db/seed.js
```

### Stop

```bash
docker compose down
```

To also delete the database volume:

```bash
docker compose down -v
```

## Project Structure

```
HaGeDu/
├── backend/         Node.js + Express API
│   ├── db/          schema.sql + seed.js
│   ├── src/         app, routes, controllers, middleware, models
│   └── Dockerfile
├── frontend/        Vue.js 3 SPA — not implemented yet
│   └── Dockerfile
├── docs/            SRS, use cases, rules
├── docker-compose.yml
└── .env.example
```

## Frontend (Planned)

The `frontend/` directory is a placeholder for a Vue.js 3 SPA.
Planned stack: Vue 3 + Vue Router + Axios + Vite.

To enable it once implemented, uncomment the `frontend` service in `docker-compose.yml`.

## Local Development (without Docker)

```bash
cd backend
cp .env.example .env   # set DB_HOST=localhost
npm install
mysql -u root -p < db/schema.sql
npm run seed
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.
Copy it to `.env` and fill in your values before running.
