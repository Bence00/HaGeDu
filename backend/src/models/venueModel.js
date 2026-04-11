const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query(
    'SELECT id, name, tixa_url, ticketswap_url, bandsintown_url FROM venues ORDER BY name'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, tixa_url, ticketswap_url, bandsintown_url FROM venues WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

module.exports = { findAll, findById };
