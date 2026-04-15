# HaGeDu – UX Design Dokumentum
## Personák, User Flow-k, Drótváz & Checklist

---

## 1. Personák és User Flow-k

---

### Persona 1 – Anna

| Mező | Adat |
|---|---|
| **Név** | Kovács Anna |
| **Kor** | 23 év |
| **Foglalkozás** | Egyetemista (ELTE BTK) |
| **Kontextus** | Budapesti bérelt lakásban él, aktív társasági életet él. Hétvégente barátaival szeret programokat szervezni, de a szervezés mindig spontán és kaotikus: mindenki más platformot néz, más helyszínt javasol. |
| **Cél** | Megtalálni egy hétvégi közös programot a baráti társasággal, amit mindenki elfogad. |
| **Pain Point** | Nincs egy közös hely, ahol összegyűjthetik a lehetőségeket – a Facebook események, Instagram, Google között szét van szórva minden, és sokszor lemaradnak a jó programokról. |

#### User Flow 1 – Helyszín keresése és megosztása baráttal

**Kiindulóállapot:** Anna bejelentkezett, a főoldalon van.

| Lépés | Képernyő | Akció | Visszajelzés |
|---|---|---|---|
| 1 | Főoldal | A keresőbe beírja: „koncert" | A helyszínlista valós időben szűrődik |
| 2 | Főoldal | A „Zene" kategória filtert aktiválja | Csak zenei helyszínek jelennek meg, a chip kiemelve látható |
| 3 | Helyszín kártya | Megnyit egy helyszínt (pl. A38 Hajó) | Helyszín részletes nézetbe lép |
| 4 | Helyszín részlet | A „Mentés" gombra kattint | Szív ikon teli lesz, toast: „Mentve a profilodba" |
| 5 | Helyszín részlet | A „Megosztás" gombra kattint, kiválasztja a barátját | Barát értesítést kap, visszajelzés: „Elküldve Péternek" |

**Végállapot:** Anna és Péter ugyanazt a mentett helyszínt látja, közösen dönthetnek.

---

### Persona 2 – Márton

| Mező | Adat |
|---|---|
| **Név** | Nagy Márton |
| **Kor** | 35 év |
| **Foglalkozás** | IT projektvezető |
| **Kontextus** | Elfoglalt hétköznapjai után a hétvégen kulturális programokat keres. Nincs ideje több oldalt böngészni, gyorsan szeretné megtalálni, mi érhető el a városban. |
| **Cél** | Gyorsan megtalálni egy minőségi kulturális programot anélkül, hogy sok időt tölt kereséssel. |
| **Pain Point** | Budapest eseményei sok különböző oldalon vannak szétszórva (jegy.hu, facebook, venue saját oldalak), és sokat kell kattintgatni mire összegyűjti az opciókat. |

#### User Flow 2 – Gyors programkeresés kategória alapján

**Kiindulóállapot:** Márton belép az alkalmazásba, bejelentkezik.

| Lépés | Képernyő | Akció | Visszajelzés |
|---|---|---|---|
| 1 | Bejelentkezés | E-mail + jelszó megadása, „Bejelentkezés" gomb | Loading spinner, majd átirányítás a főoldalra |
| 2 | Főoldal | A „Kultúra" filter chipre kattint | Lista szűrődik, aktív chip vizuálisan kiemelve |
| 3 | Helyszínlista | Görget, megnyit egy múzeumot | Részletes nézet: nyitvatartás, cím, térkép |
| 4 | Helyszín részlet | Elolvassa a leírást, megnézi a térképet | Google Maps integráció megjelenik |
| 5 | Helyszín részlet | A „Mentés" gombra kattint | Toast értesítés: „Hozzáadva a mentett helyszínekhez" |

**Végállapot:** Márton profilján megjelenik a helyszín, bármikor visszanézheti a részleteket.

---

### Persona 3 – Zsuzsanna

| Mező | Adat |
|---|---|
| **Név** | Kiss Zsuzsanna |
| **Kor** | 45 év |
| **Foglalkozás** | Általános iskolai tanár |
| **Kontextus** | Osztályprogramot szervez, Budapest kulturális kínálatát kutatja. Nem regisztrált felhasználó, először jár az oldalon. |
| **Cél** | Találni egy gyerekek számára megfelelő kulturális helyszínt Budapesten, amit be tud mutatni a szülőknek. |
| **Pain Point** | Nem tudja pontosan, mit kínál Budapest – nincs áttekintő listája a megfelelő, korosztálynak szóló helyszínekről, és nem szeretne regisztrálni minden egyes oldalra csak hogy megnézzen valamit. |

#### User Flow 3 – Vendég böngészés és regisztráció mentéshez

**Kiindulóállapot:** Zsuzsanna először nyitja meg az oldalt, nincs bejelentkezve.

| Lépés | Képernyő | Akció | Visszajelzés |
|---|---|---|---|
| 1 | Főoldal (guest) | Megérkezik az oldalra, látja a helyszínlistát | Teljes lista látható regisztráció nélkül is |
| 2 | Főoldal | A keresőbe beírja: „gyerek" | Lista szűrődik a releváns helyszínekre |
| 3 | Helyszín kártya | Megnyit egy helyszínt (pl. Csodák Palotája) | Részletes nézet betöltődik |
| 4 | Helyszín részlet | A „Mentés" gombra kattint | Modal jelenik meg: „Mentéshez regisztrálj vagy lépj be!" Primary: Regisztráció, Secondary: Bejelentkezés |
| 5 | Regisztráció | Kitölti az e-mail + jelszó mezőt, elküldi | Sikeres regisztráció toast, visszairányítás a helyszínre, automatikusan mentve |

**Végállapot:** Zsuzsanna regisztrált felhasználó, a helyszín mentve van a profiljában.

---

## 2. Teljes alkalmazás váz (Skeletonmap)

> A Personáktól független, az alkalmazás egészének oldalstruktúrája.

```
HaGeDu – Oldaltérkép
══════════════════════════════════════════════════

[/]  Főoldal (Nyilvános)
  ├── Hero szekció (keresőmező)
  ├── Filter chip-ek (Összes / Zene / Kultúra / Sport / ...)
  ├── Helyszínlista (VenueCard grid)
  │     └── [/venue/:id] Helyszín részlet (Nyilvános)
  │           ├── Leírás, Cím, Nyitvatartás
  │           ├── Térkép (Google Maps embed)
  │           ├── [BTN] Mentés  ──► Login-wall ha guest
  │           └── [BTN] Megosztás  ──► Login-wall ha guest
  │
  ├── [/login]  Bejelentkezés
  │     ├── E-mail input
  │     ├── Jelszó input
  │     ├── [BTN] Bejelentkezés  ──► Főoldal (auth)
  │     └── Link: „Nincs fiókod? Regisztrálj"
  │
  └── [/register]  Regisztráció
        ├── Felhasználónév input
        ├── E-mail input
        ├── Jelszó input
        ├── [BTN] Regisztráció  ──► Főoldal (auth)
        └── Link: „Van már fiókod? Lépj be"

[/profile]  Profil (Auth required)
  ├── Avatar + Felhasználónév + E-mail + Szerepkör badge
  ├── Mentett helyszínek szekció (VenueCard grid)
  │     └── [BTN] Mentés visszavonása minden kártyán
  └── [BTN] Kijelentkezés

[/admin]  Admin panel (Admin role required) [tervezett]
  ├── Függőben lévő helyszínek listája
  ├── Jóváhagyás / Elutasítás akciók
  └── Manuális helyszín feltöltés
```

---

## 3. Low-Fidelity Drótváz

---

### Váz 1 – Főoldal (Helyszínlista)

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [HaGeDu Logo]              [Login] [Reg.]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│              🗺 Budapest                             │
│      Fedezd fel a város legjobb eseményeit          │
│   ┌─────────────────────────────────────────────┐   │
│   │ 🔍  Keresés helyszín neve alapján...    [✕] │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   [12 Helyszín]  [Budapest]  [Ingyenes]             │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Helyszínek                          42 találat     │
│                                                     │
│  [Összes] [Zene] [Kultúra] [Sport] [Éttermek]      │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ [Kép]        │  │ [Kép]        │  │ [Kép]     │ │
│  │ Helyszín neve│  │ Helyszín neve│  │ Helyszín  │ │
│  │ Kategória    │  │ Kategória    │  │ Kategória │ │
│  │ 📍 Cím       │  │ 📍 Cím       │  │ 📍 Cím    │ │
│  │         [♡] │  │         [♡] │  │       [♡] │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ [Kép]        │  │ [Kép]        │  │ [Kép]     │ │
│  │ Helyszín neve│  │ Helyszín neve│  │ Helyszín  │ │
│  │ Kategória    │  │ Kategória    │  │ Kategória │ │
│  │ 📍 Cím       │  │ 📍 Cím       │  │ 📍 Cím    │ │
│  │         [♡] │  │         [♡] │  │       [♡] │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

**Megjegyzések:**
- A `[♡]` gomb: bejelentkezett usernek azonnal ment, guest-nek login-wall modalt nyit
- A filter chip aktív állapotában kiemelve jelenik meg
- A kereső `[✕]` gomb csak akkor látható, ha van szöveg a mezőben

---

### Váz 2 – Helyszín részlet oldal

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [HaGeDu Logo]          [Profil] [Kilép]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ← Vissza a listához                                │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │
│  │              [ Borítókép ]                    │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  A38 Hajó                          ★ 4.8 (Google)  │
│  Kategória: Zene / Koncert                          │
│                                                     │
│  📍 1117 Budapest, Petőfi híd budai hídfo.          │
│  🕐 H-P: 20:00 – 04:00 | Sz-V: 18:00 – 04:00      │
│  🎫 Belépő: 2 000 – 8 000 Ft                       │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  Leírás                                             │
│  Az A38 Budapest egyik legismertebb kulturális      │
│  és zenei hajója, ahol rendszeres koncerteket...    │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  Térkép                                             │
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │
│  │         [ Google Maps embed ]                 │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌────────────────────┐  ┌────────────────────┐    │
│  │  ♡ Mentés          │  │  ↗ Megosztás       │    │
│  │  [PRIMARY BTN]     │  │  [SECONDARY BTN]   │    │
│  └────────────────────┘  └────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Megjegyzések:**
- Ha a helyszín már mentve van: `♡ Mentés` → `♥ Mentve` (kitöltött szív, kiemelve)
- `↗ Megosztás` megnyomásra friend selector modal jelenik meg

---

### Váz 3 – Bejelentkezés

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [HaGeDu Logo]                [Regisztráció]│
├─────────────────────────────────────────────────────┤
│                                                     │
│              ┌──────────────────────────┐           │
│              │                          │           │
│              │  Üdvözlünk vissza!       │           │
│              │                          │           │
│              │  E-mail cím              │           │
│              │  ┌────────────────────┐  │           │
│              │  │ anna@example.com   │  │           │
│              │  └────────────────────┘  │           │
│              │                          │           │
│              │  Jelszó                  │           │
│              │  ┌────────────────────┐  │           │
│              │  │ ••••••••••         │  │           │
│              │  └────────────────────┘  │           │
│              │                          │           │
│              │  [  Bejelentkezés  ]      │           │
│              │      [PRIMARY]           │           │
│              │                          │           │
│              │  Nincs fiókod?           │           │
│              │  [Regisztrálj itt]       │           │
│              │                          │           │
│              └──────────────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘

Hibaállapot (hibás jelszó):
│              │  ┌────────────────────┐  │
│              │  │ ••••••••           │🔴│  ← piros keret
│              │  └────────────────────┘  │
│              │  ⚠ Hibás e-mail vagy ... │  ← hibaüzenet
```

**Megjegyzések:**
- Input validáció: üres mező, invalid e-mail formátum → inline hibaüzenet az adott input alatt
- Sikeres login: loading spinner a gombban, majd redirect főoldalra

---

### Váz 4 – Regisztráció

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [HaGeDu Logo]               [Bejelentkezés]│
├─────────────────────────────────────────────────────┤
│                                                     │
│              ┌──────────────────────────┐           │
│              │                          │           │
│              │  Hozz létre fiókot!      │           │
│              │                          │           │
│              │  Felhasználónév          │           │
│              │  ┌────────────────────┐  │           │
│              │  │                    │  │           │
│              │  └────────────────────┘  │           │
│              │                          │           │
│              │  E-mail cím              │           │
│              │  ┌────────────────────┐  │           │
│              │  │                    │  │           │
│              │  └────────────────────┘  │           │
│              │                          │           │
│              │  Jelszó                  │           │
│              │  ┌────────────────────┐  │           │
│              │  │                    │  │           │
│              │  └────────────────────┘  │           │
│              │                          │           │
│              │  [   Regisztráció    ]    │           │
│              │      [PRIMARY]           │           │
│              │                          │           │
│              │  Van már fiókod?         │           │
│              │  [Lépj be itt]           │           │
│              │                          │           │
│              └──────────────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### Váz 5 – Profil oldal

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [HaGeDu Logo]          [Profil] [Kilép]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  [KO]   Kovács Anna                           │  │
│  │ Avatar  anna@example.com                      │  │
│  │  (2bet) [user] badge                          │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Mentett helyszínek                                 │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ [Kép]        │  │ [Kép]        │  │ [Kép]     │ │
│  │ Helyszín neve│  │ Helyszín neve│  │ Helyszín  │ │
│  │ Kategória    │  │ Kategória    │  │ Kategória │ │
│  │ 📍 Cím       │  │ 📍 Cím       │  │ 📍 Cím    │ │
│  │        [♥]  │  │        [♥]  │  │      [♥]  │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                     │
│         (ha nincs mentett helyszín:)                │
│                                                     │
│         ┌──────────────────────────────┐            │
│         │  Még nem mentettél helyszínt │            │
│         │  [ Helyszínek böngészése ]   │            │
│         │       [PRIMARY BTN]          │            │
│         └──────────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### Váz 6 – Login-wall modal (guest „Mentés" kísérlet)

```
┌─────────────────────────────────────────────────────┐
│  (Háttér homályos)                                  │
│                                                     │
│         ┌────────────────────────────┐              │
│         │                            │           [✕]│
│         │  🔒 Bejelentkezés szükséges│              │
│         │                            │              │
│         │  A helyszínek mentéséhez   │              │
│         │  regisztrálj vagy lépj be! │              │
│         │                            │              │
│         │  [ Regisztráció ]  PRIMARY │              │
│         │                            │              │
│         │  [ Bejelentkezés ] OUTLINE │              │
│         │                            │              │
│         └────────────────────────────┘              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 4. Checklist validáció

Az alábbi checklist alapján minden User Flow validálva lett.

---

### Flow 1 – Anna: Helyszín keresése és megosztása

| # | Kritérium | Teljesül? | Magyarázat |
|---|---|---|---|
| **Persona & probléma** ||||
| P1 | A persona célja és kontextusa egyértelmű, a Pain Point konkrét és reális | ✅ | Anna szocializációs igénye és a szétszórt platformok problémája valós és jól definiált |
| P2 | A User Flow a felhasználói szempontok megoldásának fókuszál, összehangolt a persona céljával | ✅ | A flow pontosan a közös program megtalálását és megosztását oldja meg |
| P3 | A Flow jól definiált kiindulóállapotból indul és végállapotba ér | ✅ | Kezdet: főoldalon van; Vég: barátnak elküldve |
| **Funkció & logika** ||||
| F1 | Tartalmazza a szükséges funkciókat, lépések logikusan követik egymást | ✅ | Keresés → Szűrés → Részlet → Mentés → Megosztás lineáris és értelmes sorrend |
| F2 | Multi-step folyamat esetén érzékelhető a haladás, kritikus pontokon visszajelzés | ✅ | Filter aktiválás vizuális visszajelzéssel, mentés toast, megosztás confirm |
| F3 | Inputok, gombok, Primary/Secondary akciók megkülönböztethetők | ✅ | Kereső input + filter chip + Mentés (primary) + Megosztás (secondary) |
| **Visszajelzés & állapotok** ||||
| V1 | A rendszer jelzi az állapotváltozásokat | ✅ | Szűrés után lista frissül; mentés után szív ikon teli lesz |
| V2 | Input validáció megjelenik | ✅ | Keresőnél nincs találat esetén „Nincs találat" állapot jelenik meg |
| V3 | Siker/hiba üzenet az érintett elemen látható | ✅ | Toast: „Mentve a profilodba" + „Elküldve Péternek" |
| V4 | Fontos állapotok biztosítottak a hierarchiában | ✅ | Guest ≠ Auth állapot különbözően kezelt (login-wall) |
| **Struktúra & hierarchia** ||||
| S1 | Információ és funkciók hierarchiája egyértelmű | ✅ | Főoldal → Kártya → Részlet oldal egyértelmű mélységi struktúra |
| S2 | Layout, flow és kapcsolódó elemek struktúrája átlátható | ✅ | Drótvázon látható az elrendezés és elemkapcsolatok |
| S3 | Wireframe tükrözi az alkalmazás kommunikációs struktúráját | ✅ | Navbar, tartalom, akció gombok konzisztensek minden vázon |

---

### Flow 2 – Márton: Gyors programkeresés

| # | Kritérium | Teljesül? | Magyarázat |
|---|---|---|---|
| **Persona & probléma** ||||
| P1 | Pain Point konkrét és reális | ✅ | Több platform böngészése időigényes – valós probléma foglalkoztatott embereknél |
| P2 | Flow összehangolt a persona céljával | ✅ | Login → Szűrés → Részlet → Mentés pontosan Márton igényét adresszálja |
| P3 | Definiált kezdő- és végállapot | ✅ | Kezdet: login oldal; Vég: helyszín mentve profilban |
| **Funkció & logika** ||||
| F1 | Szükséges funkciók megvannak, lépések logikusak | ✅ | Bejelentkezés → Kategória szűrés → Helyszín megtekintés → Mentés |
| F2 | Visszajelzés minden kritikus ponton | ✅ | Login spinner, szűrés vizuális, térkép betöltés, mentés toast |
| F3 | Primary/Secondary akciók elkülönítve | ✅ | „Mentés" = primary; „Megosztás" = secondary/outline |
| **Visszajelzés & állapotok** ||||
| V1 | Állapotváltozások jelzése | ✅ | Betöltés → Lista → Részlet nézet állapotai jól elkülöníthetők |
| V2 | Input validáció | ✅ | Login formon invalid e-mail / üres jelszó kezelve |
| V3 | Siker/hiba üzenet | ✅ | Hibás login: inline hibaüzenet; sikeres login: redirect |
| V4 | Állapotok biztosítottak | ✅ | Loading, error, empty, filled állapotok kezelve a helyszínlistán |
| **Struktúra & hierarchia** ||||
| S1 | Hierarchia egyértelmű | ✅ | Navbar > Szekció > Kártya grid > Részlet oldal |
| S2 | Layout átlátható | ✅ | Drótvázon konzisztens felső navigáció + tartalom + akciók |
| S3 | Wireframe tükrözi a struktúrát | ✅ | Minden vázlaton azonos navigáció és tartalomterület |

---

### Flow 3 – Zsuzsanna: Vendég böngészés és regisztráció

| # | Kritérium | Teljesül? | Magyarázat |
|---|---|---|---|
| **Persona & probléma** ||||
| P1 | Pain Point konkrét és reális | ✅ | Regisztráció nélküli böngészés igénye valós – nem akar minden oldalra regisztrálni |
| P2 | Flow összehangolt a persona céljával | ✅ | Guest → Keresés → Részlet → Login-wall → Regisztráció → Mentés |
| P3 | Definiált kezdő- és végállapot | ✅ | Kezdet: ismeretlen vendég; Vég: regisztrált user, helyszín mentve |
| **Funkció & logika** ||||
| F1 | Szükséges funkciók megvannak | ✅ | Nyilvános böngészés + fokozatos regisztrációra ösztönzés |
| F2 | Visszajelzés haladásról | ✅ | Modal egyértelműen jelzi mi szükséges a mentéshez |
| F3 | Primary/Secondary megkülönböztethető | ✅ | Modal: „Regisztráció" = primary, „Bejelentkezés" = secondary/outline |
| **Visszajelzés & állapotok** ||||
| V1 | Állapotváltozások jelzése | ✅ | Guest → Auth állapotváltás modal + redirect + automatikus mentés |
| V2 | Input validáció | ✅ | Regisztrációs form: e-mail formátum, jelszó hossz ellenőrzés |
| V3 | Siker/hiba üzenet | ✅ | Sikeres regisztráció: toast + automatikus mentés visszajelzéssel |
| V4 | Állapotok biztosítottak | ✅ | Guest nézet, Login-wall modal, Auth nézet egyértelműen elkülönül |
| **Struktúra & hierarchia** ||||
| S1 | Hierarchia egyértelmű | ✅ | Guest esetén korlátozott navbar (Login / Register), Auth esetén teljes |
| S2 | Layout átlátható | ✅ | Login-wall modal a helyszín részlet fölé jelenik meg, nincs oldalváltás |
| S3 | Wireframe tükrözi a struktúrát | ✅ | Modal vázon látható a backdrop + akciók hierarchiája |

---

*Dokumentum verziója: 1.0 – HaGeDu UX Design, 2026. április*
