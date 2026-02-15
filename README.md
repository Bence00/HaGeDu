# EventHub — Városi Eseményaggregátor Platform

> Egy több városra skálázható programkereső webalkalmazás, amely automatikusan gyűjt eseményeket külső forrásokból (API-k, RSS), admin jóváhagyás után megjeleníti őket, és lehetővé teszi a felhasználók számára az események böngészését, mentését, megosztását és személyre szabott ajánlások fogadását.

---

## Tartalomjegyzék

- [Projekt célja](#projekt-célja)
- [MVP hatókör](#mvp-hatókör)
- [Szereplők (Actors)](#szereplők-actors)
- [Funkcionális követelmények](#funkcionális-követelmények)
- [Adatmodell](#adatmodell)
- [Adatgyűjtési pipeline](#adatgyűjtési-pipeline)
- [Architektúra](#architektúra)
- [Technológiai stack](#technológiai-stack)
- [Nem funkcionális követelmények](#nem-funkcionális-követelmények)
- [Elfogadási kritériumok](#elfogadási-kritériumok)
- [Csapat](#csapat)
- [Repo struktúra](#repo-struktúra)
- [Telepítés és futtatás](#telepítés-és-futtatás)
- [Későbbi fejlesztések (Phase 2)](#későbbi-fejlesztések-phase-2)

---

## Projekt célja

Egy olyan webalkalmazás létrehozása, amely **automatikusan összegyűjti** a városi kulturális és szórakozási eseményeket külső adatforrásokból, majd egy egységes, könnyen kereshető felületen jeleníti meg őket. A rendszer célja, hogy bárki — fiatal vagy idős — egyetlen helyen megtalálja a környékén zajló programokat, jegyinformációkkal, térképes megjelenítéssel és közösségi funkciókkal.

**Miért van erre szükség?**
- Az események szétszórtan, különböző oldalakon jelennek meg
- Nincs egységes platform, amely összegyűjti és szűrhetővé teszi ezeket
- A felhasználók személyre szabott ajánlásokat és közösségi funkciókat is szeretnének

---

## MVP hatókör

Az MVP (Minimum Viable Product) a 12 hetes fejlesztési ciklus végére az alábbiakat tartalmazza:

| Kritérium | Cél |
|-----------|-----|
| Támogatott városok | Legalább **1 város** teljes lefedettséggel |
| Adatforrások | Minimum **20 külső forrás** (API, RSS) |
| Automatizálás | Napi szintű automatikus adatgyűjtés |
| Admin workflow | Pending → Approved publikálási folyamat |
| Felhasználói élmény | Keresés, szűrés, térképes nézet, jegylink |
| Demó | Élő, működő demó valós adatokkal |

---

## Szereplők (Actors)

### 1. Látogató (nem regisztrált)
- Böngészi az eseményeket szabadon
- Szűr város, kategória, dátum, ár (ingyenes/fizetős) szerint
- Megtekinti az esemény részleteit térképen
- Átkattint a jegyvásárlási oldalra

### 2. Regisztrált felhasználó
- Minden, amit a látogató tud, **plusz:**
- Heti személyre szabott programajánlót kap (e-mail)
- Eseményeket ment a profiljába
- Jelzi, hogy részt vesz egy eseményen (és ezt ismerősei látják)
- Eseményt küld/megoszt ismerőseivel a platformon belül
- Személyre szabott ajánlásokat kap az érdeklődései alapján

### 3. Admin
- Automatikusan begyűjtött eseményeket jóváhagy vagy elutasít
- Eseményeket szerkeszt, töröl, javít
- Hibás vagy duplikált adatokat kezel
- Manuálisan is feltölthet eseményt (fallback)

### 4. Külső rendszer (External System)
- Esemény API-k (Ticketmaster, Eventbrite stb.)
- RSS feedek (városi kulturális oldalak)
- Jegyvásárló platformok (linkek)

---

## Funkcionális követelmények

### UC-1: Esemény böngészés és keresés
- Lista nézet az összes jóváhagyott eseményről
- **Szűrési lehetőségek:** város, kategória, dátumtartomány, ár (ingyenes/fizetős)
- Rendezés: dátum, népszerűség, ár szerint
- Keresés eseménynévre és leírásra

### UC-2: Esemény részletek megtekintése
Egy eseményre kattintva megjelenik:
- **Hely** — térképen megjelenítve (Google Maps)
- **Időpont** — kezdés és befejezés
- **Ár** — jegyárak, ingyenes jelölés
- **Leírás** — rövid összefoglaló a programról
- **Helyszín értékelése** — ha elérhető (pl. Google Places rating)
- **Jegyvásárlás link** — átirányítás a külső jegyértékesítőre

### UC-3: Regisztráció és profil
- Regisztráció e-mail + jelszó párossal
- **Nincs kötelező regisztráció** a böngészéshez — csak a közösségi funkciókhoz
- Felhasználói profil: mentett események, érdeklődési körök, részvételi előzmények
- Heti programajánló e-mail feliratkozás

### UC-4: Közösségi funkciók
- **„Ott leszek"** jelölés — ismerősök látják
- **Esemény megosztása** ismerősnek a platformon belül
- **Esemény mentése** későbbi megtekintéshez
- **Személyre szabott ajánlások** az érdeklődések és korábbi viselkedés alapján

### UC-5: Admin eseménykezelés (moderáció)
- Automatikusan begyűjtött események `pending` státuszban érkeznek
- Admin megtekinti, szerkeszti, majd jóváhagyja (`approved`) vagy elutasítja
- Jóváhagyás után az esemény megjelenik a publikus felületen
- Manuális esemény feltöltés lehetőség (fallback, ha API-ból nem jön adat)

### UC-6: Automatikus adatgyűjtés
- A rendszer **napi rendszerességgel** lekérdezi a konfigurált külső forrásokat
- Az adatok feldolgozás után `pending` státuszba kerülnek
- Deduplikáció a collector pipeline-ban (azonos esemény több forrásból)

---

## Adatmodell

### Event (Esemény)
| Mező | Típus | Leírás |
|------|-------|--------|
| `id` | UUID | Egyedi azonosító |
| `title` | string | Esemény neve |
| `description` | text | Rövid leírás |
| `venue_name` | string | Helyszín neve |
| `venue_address` | string | Helyszín címe |
| `city` | string | Város |
| `latitude` | float | Szélességi koordináta |
| `longitude` | float | Hosszúsági koordináta |
| `start_date` | datetime | Kezdés időpontja |
| `end_date` | datetime | Befejezés időpontja |
| `price` | decimal / null | Ár (null = ingyenes) |
| `ticket_url` | string / null | Jegyvásárlási link |
| `category` | string | Kategória (koncert, kiállítás, sport stb.) |
| `source` | string | Adatforrás azonosítója |
| `source_type` | enum | `api` / `rss` / `manual` |
| `status` | enum | `pending` / `approved` / `rejected` |
| `image_url` | string / null | Eseményhez tartozó kép |
| `venue_rating` | float / null | Helyszín értékelése |
| `created_at` | datetime | Létrehozás dátuma |
| `updated_at` | datetime | Utolsó módosítás |

### User (Felhasználó)
| Mező | Típus | Leírás |
|------|-------|--------|
| `id` | UUID | Egyedi azonosító |
| `email` | string | E-mail cím |
| `password_hash` | string | Hashelt jelszó (bcrypt) |
| `name` | string | Megjelenítendő név |
| `interests` | string[] | Érdeklődési körök (kategóriák) |
| `weekly_digest` | boolean | Feliratkozott-e heti ajánlóra |
| `created_at` | datetime | Regisztráció dátuma |

### SavedEvent (Mentett esemény)
| Mező | Típus | Leírás |
|------|-------|--------|
| `user_id` | FK → User | Felhasználó |
| `event_id` | FK → Event | Esemény |
| `saved_at` | datetime | Mentés időpontja |

### Participation (Részvétel)
| Mező | Típus | Leírás |
|------|-------|--------|
| `user_id` | FK → User | Felhasználó |
| `event_id` | FK → Event | Esemény |
| `status` | enum | `going` / `interested` |

### SharedEvent (Megosztás)
| Mező | Típus | Leírás |
|------|-------|--------|
| `sender_id` | FK → User | Küldő |
| `receiver_id` | FK → User | Címzett |
| `event_id` | FK → Event | Esemény |
| `shared_at` | datetime | Megosztás időpontja |

### Friendship (Ismerős kapcsolat)
| Mező | Típus | Leírás |
|------|-------|--------|
| `user_id` | FK → User | Felhasználó A |
| `friend_id` | FK → User | Felhasználó B |
| `status` | enum | `pending` / `accepted` |

> **Megjegyzés:** Az MVP-ben **nincs külön Venue tábla** — a helyszín adatai közvetlenül az Event-ben tárolódnak. Ha később szükség van rá (pl. helyszín-oldal, több esemény egy helyszínen), Phase 2-ben kiszervezhető.

---

## Adatgyűjtési pipeline

```
┌─────────────────────────────────────────────────┐
│                KÜLSŐ FORRÁSOK                    │
│  Ticketmaster API · Eventbrite API · RSS feedek  │
│  Városi kulturális oldalak · Egyéb API-k         │
└─────────────┬───────────────────────────────────┘
              │  (napi ütemezés)
              ▼
┌─────────────────────────────┐
│    COLLECTOR SERVICE        │
│  - API lekérdezés           │
│  - Adat normalizálás        │
│  - Deduplikáció             │
│  - Geocoding (cím → lat/lon)│
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│    DATABASE (pending)       │
│  status = 'pending'         │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│    ADMIN MODERÁCIÓ          │
│  Átnézi → Approve / Reject │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│    PUBLIKUS FELÜLET         │
│  status = 'approved'        │
│  Felhasználók böngészik     │
└─────────────────────────────┘
```

### Adatgyűjtési stratégia (MVP)

| Prioritás | Stratégia | Leírás |
|-----------|-----------|--------|
| **1. (elsődleges)** | Event aggregátor API-k | Ticketmaster, Eventbrite — strukturált, megbízható adat |
| **2. (kiegészítő)** | RSS feedek | Városi kulturális oldalak, önkormányzati hírek |
| **3. (fallback)** | Manuális admin feltöltés | Ha API-ból nem érkezik elég adat |

> **Scraping és AI-alapú entitáskinyerés** a Phase 2-re marad — az MVP-ben csak strukturált API/RSS adatokkal dolgozunk.

### Fallback terv
Ha egy adatforrás elérhetetlenné válik (API limit, feed megszűnés):
- A rendszer naplózza a hibát
- Admin értesítést kap
- Manuális feltöltés marad biztosítéknak
- Minimális fallback: az alkalmazás csak admin által feltöltött eseményeket mutat

---

## Architektúra

```
┌──────────────────┐       ┌──────────────────┐
│                  │       │                  │
│   FRONTEND       │◄─────►│   BACKEND API    │
│   (React)        │ REST  │   (Node.js)      │
│                  │       │                  │
└──────────────────┘       └────────┬─────────┘
                                    │
                           ┌────────▼─────────┐
                           │                  │
                           │   PostgreSQL     │
                           │   Database       │
                           │                  │
                           └──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│  Külső API-k     │──────►│ Collector        │──────► Database
│  (Ticketmaster,  │       │ Service          │        (pending)
│   Eventbrite,    │       │ (Node.js cron)   │
│   RSS feedek)    │       │                  │
└──────────────────┘       └──────────────────┘

┌──────────────────┐
│  Google Maps API │◄────── Frontend (térkép)
│  Google Geocoding│◄────── Collector (cím → koordináta)
│  SendGrid        │◄────── Backend (heti ajánló e-mail)
└──────────────────┘
```

### API végpontok (MVP)

| Metódus | Végpont | Leírás | Auth |
|---------|---------|--------|------|
| `GET` | `/api/events` | Események listázása (szűrőkkel) | — |
| `GET` | `/api/events/:id` | Esemény részletei | — |
| `GET` | `/api/categories` | Elérhető kategóriák | — |
| `GET` | `/api/cities` | Elérhető városok | — |
| `POST` | `/api/auth/register` | Regisztráció | — |
| `POST` | `/api/auth/login` | Bejelentkezés (JWT) | — |
| `GET` | `/api/users/me` | Saját profil | JWT |
| `POST` | `/api/events/:id/save` | Esemény mentése | JWT |
| `DELETE` | `/api/events/:id/save` | Mentés törlése | JWT |
| `POST` | `/api/events/:id/participate` | „Ott leszek" jelölés | JWT |
| `POST` | `/api/events/:id/share` | Esemény megosztása ismerősnek | JWT |
| `GET` | `/api/friends` | Ismerősök listája | JWT |
| `POST` | `/api/friends/request` | Ismerős kérés küldése | JWT |
| `GET` | `/api/admin/events` | Pending események (admin) | Admin JWT |
| `PATCH` | `/api/admin/events/:id` | Jóváhagyás / elutasítás | Admin JWT |
| `POST` | `/api/admin/events` | Manuális esemény feltöltés | Admin JWT |

---

## Technológiai stack

| Réteg | Technológia | Indoklás |
|-------|-------------|----------|
| **Frontend** | React | Komponens alapú, nagy ökoszisztéma |
| **CSS** | Tailwind CSS | Gyors fejlesztés, reszponzív, mobile-first |
| **Backend** | Node.js (Express) | Könnyű, JavaScript mindenhol |
| **Adatbázis** | PostgreSQL | Megbízható, jó szűrési lehetőségek, ingyenes |
| **Auth** | JWT (JSON Web Token) | Egyszerű, stateless, jól skálázódik |
| **Térkép** | Google Maps API | Legjobb lefedettség, ismerős UX |
| **Geocoding** | Google Geocoding API | Cím → koordináta átalakítás |
| **E-mail** | SendGrid | Heti ajánló e-mailek küldése |
| **Hosting** | *Döntés szükséges* | Ajánlott: **Render** (egyszerű), Railway, vagy Docker VPS |
| **CI/CD** | GitHub Actions | Automatikus build + deploy push-ra |
| **Verziókezelés** | Git + GitHub | Issues, PR-ek, közös repo |
| **Projektmenedzsment** | Notion + GitHub Issues | Feladatkezelés, dokumentáció |

---

## Nem funkcionális követelmények

### Biztonság
- Jelszavak **bcrypt** hashsel tárolva
- JWT tokenek lejárati idővel (pl. 24h)
- Admin végpontok külön jogosultsággal védve
- HTTPS a deploy-on (SSL tanúsítvány)
- API kulcsok és titkok environment variable-ökben (`dotenv`), soha nem commitolva

### Naplózás
- Admin műveletek naplózva (ki, mit, mikor hagyott jóvá/utasított el)
- API hibák és külső forrás hibák logolva
- Collector futások eredménye naplózva (hány új esemény, hány hiba)

### Teljesítmény
- Események lekérdezésénél adatbázis indexek a gyakori szűrőkre (város, dátum, kategória, státusz)
- Lapozás (pagination) a lista végpontokon

### Reszponzivitás
- **PC-first** design, de működik telefonon is
- Breakpointok: desktop (1024px+), tablet (768px), mobil (< 768px)

---

## Elfogadási kritériumok

A projekt akkor tekinthető késznek, ha:

- [ ] Legalább **1 város** eseményei elérhetők
- [ ] Minimum **20 külső adatforrás** csatlakoztatva és működik
- [ ] **Automatikus napi adatgyűjtés** fut
- [ ] **Admin approve workflow** működik (pending → approved)
- [ ] **Eseménykeresés** és szűrés működik (város, kategória, dátum, ár)
- [ ] **Térkép** megjelenítés az esemény részleteinél
- [ ] **Jegyvásárlási link** átirányítás működik
- [ ] **Regisztráció** és bejelentkezés működik
- [ ] **Közösségi funkciók** működnek (mentés, részvétel jelzés, megosztás)
- [ ] **Élő demó** bemutatható valós adatokkal
- [ ] **Reszponzív** megjelenés (PC + mobil)

---

## Csapat

| Név | Szerep |
|-----|--------|
| **Géczi Bence** | Frontend lead |
| **Hamar János** | Backend lead |
| **Durucskó Márton** | Adatgyűjtés / integráció / DevOps |

### Kommunikáció
- **GitHub** — kód, issues, PR-ek
- **Notion** — dokumentáció, feladatkezelés, meeting jegyzőkönyvek

---

## Repo struktúra

```
eventhub/
├── frontend/              # React frontend alkalmazás
│   ├── src/
│   │   ├── components/    # Újrahasználható UI komponensek
│   │   ├── pages/         # Oldalak (Home, EventList, EventDetail, Admin)
│   │   ├── services/      # API hívások
│   │   └── utils/         # Segédfüggvények
│   └── package.json
│
├── backend/               # Node.js Express API
│   ├── src/
│   │   ├── routes/        # API végpontok
│   │   ├── models/        # Adatbázis modellek
│   │   ├── middleware/    # Auth, error handling
│   │   ├── services/      # Üzleti logika
│   │   └── collectors/    # Adatgyűjtő modulok
│   └── package.json
│
├── docs/                  # Dokumentáció
│   ├── srs.md             # Software Requirements Specification
│   ├── architecture.png   # Architektúra diagram
│   └── er-diagram.png     # ER diagram
│
├── .github/
│   └── workflows/         # CI/CD pipeline
│
├── .env.example           # Environment változók minta
├── docker-compose.yml     # Lokális fejlesztéshez (opcionális)
└── README.md              # Ez a fájl
```

---

## Telepítés és futtatás

### Előfeltételek
- Node.js 18+
- PostgreSQL 15+
- npm vagy yarn

### Backend
```bash
cd backend
cp .env.example .env       # Konfiguráld a DB és API kulcsokat
npm install
npm run migrate            # Adatbázis séma létrehozása
npm run seed               # (opcionális) Teszt adatok
npm run dev                # Fejlesztői szerver indítása
```

### Frontend
```bash
cd frontend
cp .env.example .env       # API URL beállítása
npm install
npm run dev                # Fejlesztői szerver indítása
```

### Collector futtatása (manuális)
```bash
cd backend
npm run collect            # Adatgyűjtés futtatása
```

---

## Későbbi fejlesztések (Phase 2)

A következő funkciók **nem** részei az MVP-nek, de a rendszer úgy van tervezve, hogy könnyen bővíthető legyen:

| Funkció | Leírás |
|---------|--------|
| **Több város** | Skálázás további városokra |
| **Geolocation** | Automatikus városdetektálás a felhasználó helye alapján |
| **Web scraping** | Playwright-alapú adatgyűjtés nem API-s forrásokból |
| **AI/NLP extraction** | LLM-alapú entitáskinyerés strukturálatlan szövegből |
| **ElasticSearch** | Fejlett keresési funkciók, relevancia rangsorolás |
| **Push értesítések** | Kedvenc kategória/helyszín alapú értesítések |
| **PostGIS** | Geokódolt helyadatok, közelségi keresés |
| **Rate limiting** | API abuse védelem |
| **Részletes analitika** | Felhasználói viselkedés elemzés, népszerűségi metrikák |

---

## Licenc

*Meghatározandó*

---

> **Utolsó frissítés:** 2026. február
