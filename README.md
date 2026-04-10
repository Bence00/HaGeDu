# HaGeDu — Budapest esemény aggregátor

**HaGeDu** (~40) budapesti rendezvényhelyszín jegyplatform-jelenlétét gyűjti össze egyetlen webalkalmazásba.  
A felhasználók böngészhetnek a helyszínek között, megnézhetik melyik platformon (Tixa, TicketSwap, Bandsintown) érhetők el, kedvenceket menthetnek, és közvetlenül a vásárlási oldalra navigálhatnak.

## Technológiai stack

| Réteg    | Technológia                         |
|----------|-------------------------------------|
| Frontend | Vue.js 3 + Composition API, Pinia, Vue Router, Axios, Vite |
| Backend  | Node.js + Express                   |
| Adatbázis | MySQL 8                            |
| Auth     | JWT (jsonwebtoken + bcryptjs)        |

## Dokumentáció

- [Felhasználói útmutató](docs/user-guide.md)
- [Fejlesztői dokumentáció](docs/developer-guide.md)

## Gyors indítás

```bash
# Backend
cd backend
cp .env.example .env   # Töltsd ki az adatbázis adatokat és JWT_SECRET-et
npm install
mysql -u root -p < db/schema.sql
npm run seed
npm run dev

# Frontend (új terminálban)
cd frontend
npm install
npm run dev
```

Backend: `http://localhost:3000`  
Frontend: `http://localhost:5173`
