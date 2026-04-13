# HaGeDu - Budapest Event Aggregator

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | MySQL 8 |
| Auth | JWT (`jsonwebtoken` + `bcryptjs`) |
| Frontend | Vue.js 3, Vue Router, Axios, Vite |

## Quick Start (Docker)

```bash
cp .env.example .env
docker compose up --build
docker compose exec backend node db/seed.js
```

Open:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

Stop:

```bash
docker compose down
```
