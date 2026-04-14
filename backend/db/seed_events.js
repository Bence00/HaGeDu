require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const pool = require('../src/config/db');

// Helpers
function addDays(d, days) {
  return new Date(d.getTime() + days * 86_400_000);
}
function atHour(d, h, m = 0) {
  const r = new Date(d);
  r.setHours(h, m, 0, 0);
  return r;
}
function fmt(d) {
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

async function seed() {
  const [existing] = await pool.query('SELECT COUNT(*) AS cnt FROM events');
  if (existing[0].cnt > 0) {
    console.log('events tábla már tartalmaz adatot, seed kihagyva.');
    process.exit(0);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // col order: title, description, category, date_time, venue_id, address, source_url, source, price_info
  const rows = [
    // ── Zene ────────────────────────────────────────────────────────────────
    [
      'Akvárium Zeneéjszaka',
      'Egy felejthetetlen este Budapest legismertebb underground klubjában. Több fellépő, két szint, rengeteg zene.',
      'Zene', fmt(atHour(today, 21)),
      null, 'Budapest, Erzsébet tér 12 – Akvárium Klub',
      'https://tixa.hu', 'tixa', '2500 Ft',
    ],
    [
      'Budapest Jazz Fesztivál',
      'A város legrangosabb jazz eseménye, tíz fellépővel és éjjel-nappal szóló zenével a Várkert Bazárban.',
      'Zene', fmt(atHour(addDays(today, 3), 18)),
      null, 'Budapest, Ybl Miklós tér 2–6 – Várkert Bazár',
      'https://tixa.hu', 'tixa', '3500–6000 Ft',
    ],
    [
      'Indie Rock Showcase',
      'Hazai indie és alternative előadók közös estje három teremben.',
      'Zene', fmt(atHour(addDays(today, 5), 19)),
      null, 'Budapest, Ajtósi Dürer sor 19–21 – Dürer Kert',
      'https://ticketswap.com', 'ticketswap', '1800 Ft',
    ],
    [
      'Elektronikus Zene: Modular Szintézis',
      'Kísérleti elektronikus est moduláris szintetizátor-performanszokkal és live coding bemutatókkal.',
      'Zene', fmt(atHour(addDays(today, 9), 20)),
      null, 'Budapest, Liliom utca 41 – Trafó',
      'https://tixa.hu', 'tixa', '2000 Ft',
    ],

    // ── Kultúra ─────────────────────────────────────────────────────────────
    [
      'Budapest Kulturális Séta',
      'Vezetett séta a belváros elrejtett kulturális kincsei között. Korlátozott férőhely, előzetes regisztráció szükséges!',
      'Kultúra', fmt(atHour(addDays(today, 1), 10)),
      null, 'Budapest, Deák Ferenc tér (találkozópont)',
      null, 'egyeb', 'Ingyenes',
    ],
    [
      'Fővárosi Múzeumok Éjszakája',
      'Budapest legjobb múzeumai egy éjszakán át nyitva tartanak, különleges programokkal és tárlatvezetésekkel.',
      'Kultúra', fmt(atHour(addDays(today, 4), 18)),
      null, 'Budapest, több helyszín',
      null, 'egyeb', '1500 Ft (kombinált jegy)',
    ],
    [
      'Utcai Fesztivál: Vörösmarty tér',
      'Élő zene, street food és helyi kézműves termékek a belváros szívében, egész hétvégén.',
      'Kultúra', fmt(atHour(addDays(today, 12), 11)),
      null, 'Budapest, Vörösmarty tér',
      null, 'egyeb', 'Ingyenes',
    ],

    // ── Színház ─────────────────────────────────────────────────────────────
    [
      'Macbeth – Katona József Színház',
      'Shakespeare klasszikus tragédiájának kísérteties modern feldolgozása. Rendező: Zsámbéki Gábor.',
      'Színház', fmt(atHour(addDays(today, 2), 19, 30)),
      null, 'Budapest, Petőfi Sándor utca 6 – Katona József Színház',
      'https://tixa.hu', 'tixa', '2000–4500 Ft',
    ],
    [
      'A Vihar – Vígszínház',
      'Shakespeare örök érvényű darabja izgalmas, látványos rendezésben a Vígszínházban.',
      'Színház', fmt(atHour(addDays(today, 7), 19)),
      null, 'Budapest, Szent István körút 14 – Vígszínház',
      'https://tixa.hu', 'tixa', '2500–5000 Ft',
    ],
    [
      'Kortárs Táncszínház: Árnyék',
      'Fény, árnyék és mozgás találkozása ebben a díjnyertes kortárs táncszínházi produkcióban.',
      'Színház', fmt(atHour(addDays(today, 10), 20)),
      null, 'Budapest, Liliom utca 41 – Trafó',
      'https://tixa.hu', 'tixa', '2000–3000 Ft',
    ],

    // ── Sport ────────────────────────────────────────────────────────────────
    [
      'Budapest Félmaraton 2026',
      'Budapest legnépszerűbb futóversenye, 21 km a Duna partján és a belváros szívében. Kb. 8000 résztvevő.',
      'Sport', fmt(atHour(addDays(today, 3), 9)),
      null, 'Budapest, Hősök tere (rajt és cél)',
      null, 'egyeb', '5000 Ft (nevezési díj)',
    ],
    [
      'FTC vs. MOL Fehérvár – OTP Bank Liga',
      'A Fradi hazai pályán fogadja a bajnoki rivális MOL Fehérvárt az NB I 28. fordulójában.',
      'Sport', fmt(atHour(addDays(today, 1), 17, 30)),
      null, 'Budapest, Üllői út 129 – Groupama Aréna',
      'https://tixa.hu', 'tixa', '2000–8000 Ft',
    ],
    [
      'Reggeli Szabadtéri Jóga',
      'Ingyenes közösségi jóga a Városligetben. Hozz magaddal szőnyeget, minden szintnek ajánlott.',
      'Sport', fmt(atHour(today, 8)),
      null, 'Budapest, Városliget (főbejárat)',
      null, 'egyeb', 'Ingyenes',
    ],

    // ── Buli ─────────────────────────────────────────────────────────────────
    [
      'Club Night: Fogasház',
      'Fogasház havi nagybuli: techno, house és dj-set egész éjjel három termen át.',
      'Buli', fmt(atHour(today, 23)),
      null, 'Budapest, Akácfa utca 49–51 – Fogasház',
      'https://ticketswap.com', 'ticketswap', '2000 Ft',
    ],
    [
      'Techno Este: Instant',
      'Underground techno és minimal electronic a legendás Instant-Fogasban. Headliner: külföldi vendég DJ.',
      'Buli', fmt(atHour(addDays(today, 2), 22)),
      null, 'Budapest, Nagymező utca 38 – Instant',
      'https://ticketswap.com', 'ticketswap', '1500–2500 Ft',
    ],
    [
      'Rooftop Party: Panoráma Bár',
      'Tetőterasz buli panorámás kilátással Budapestre, live DJ-vel és signature koktélokkal.',
      'Buli', fmt(atHour(addDays(today, 4), 21)),
      null, 'Budapest, 7. kerület (pontos cím regisztráció után)',
      null, 'egyeb', '3000 Ft',
    ],

    // ── Kiállítás ────────────────────────────────────────────────────────────
    [
      'Kortárs Magyar Fotográfia 2026',
      'Válogatás hazai fotóművészek legfrissebb alkotásaiból. A kiállítás 2026. március–május között látogatható.',
      'Kiállítás', fmt(atHour(today, 10)),
      null, 'Budapest, Kálvin tér 8 – Magyar Fotográfiai Múzeum',
      null, 'egyeb', '800 Ft',
    ],
    [
      'Banksy: A Grafiti Forradalma',
      'A világ leghíresebb utcai művészének munkásságát bemutató látványos vándorkiállítás. Interaktív installációk.',
      'Kiállítás', fmt(atHour(addDays(today, 1), 10)),
      null, 'Budapest, Üllői út 48 – MODEM Kortárs Művészeti Központ',
      'https://tixa.hu', 'tixa', '2500 Ft',
    ],
    [
      'Magyar Természetfotó 2026',
      'Az év legjobb hazai természet- és wildlife fotóit bemutató éves kiállítás a természettudományi múzeumban.',
      'Kiállítás', fmt(atHour(addDays(today, 6), 10)),
      null, 'Budapest, Baross utca 13 – Magyar Természettudományi Múzeum',
      null, 'egyeb', '1200 Ft',
    ],
    [
      'Design Hét Budapest 2026',
      'Budapest éves design fesztiválja: workshopok, kiállítások, bemutatók és iparági kerekasztalok egy héten át.',
      'Kiállítás', fmt(atHour(addDays(today, 8), 9)),
      null, 'Budapest, több helyszín (Millenáris, MOME, Design Terminal)',
      null, 'egyeb', 'Ingyenes – 1500 Ft',
    ],
  ];

  await pool.query(
    `INSERT INTO events
       (title, description, category, date_time, venue_id, address, source_url, source, price_info)
     VALUES ?`,
    [rows]
  );

  console.log(`${rows.length} esemény betöltve.`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed hiba:', err);
  process.exit(1);
});
