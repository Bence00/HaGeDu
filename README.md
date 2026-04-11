# HaGeDu

## For Users

Run the application with Docker:

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

