require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const fs   = require('fs');
const csv  = require('csv-parser');
const pool = require('../src/config/db');

async function seed() {
  const [existing] = await pool.query('SELECT COUNT(*) as count FROM venues');
  if (existing[0].count > 0) {
    console.log('venues tábla már tartalmaz adatot, seed kihagyva.');
    process.exit(0);
  }

  const venues = [];
  const csvPath = require('path').resolve(__dirname, '../data/venues.csv');

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      venues.push([
        row.name,
        row.tixa_url        || null,
        row.ticketswap_url  || null,
        row.bandsintown_url || null,
      ]);
    })
    .on('end', async () => {
      try {
        if (!venues.length) {
          console.log('Nincs adat a CSV-ben.');
          process.exit(1);
        }
        await pool.query(
          'INSERT INTO venues (name, tixa_url, ticketswap_url, bandsintown_url) VALUES ?',
          [venues]
        );
        console.log(`${venues.length} helyszín betöltve.`);
        process.exit(0);
      } catch (err) {
        console.error('DB hiba a seed során:', err);
        process.exit(1);
      }
    })
    .on('error', (err) => {
      console.error('CSV olvasási hiba:', err);
      process.exit(1);
    });
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
