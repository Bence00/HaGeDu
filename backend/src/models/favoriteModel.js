const pool = require('../config/db');

// Returns all venues saved by a user
async function findByUser(userId) {
  const [rows] = await pool.query(
    `SELECT v.id, v.name, v.tixa_url, v.ticketswap_url, v.bandsintown_url
     FROM favorites f
     JOIN venues v ON v.id = f.venue_id
     WHERE f.user_id = ?
     ORDER BY f.created_at DESC`,
    [userId]
  );
  return rows;
}

async function exists(userId, venueId) {
  const [rows] = await pool.query(
    'SELECT id FROM favorites WHERE user_id = ? AND venue_id = ?',
    [userId, venueId]
  );
  return rows.length > 0;
}

async function create(userId, venueId) {
  await pool.query(
    'INSERT INTO favorites (user_id, venue_id) VALUES (?, ?)',
    [userId, venueId]
  );
}

async function remove(userId, venueId) {
  await pool.query(
    'DELETE FROM favorites WHERE user_id = ? AND venue_id = ?',
    [userId, venueId]
  );
}

module.exports = { findByUser, exists, create, remove };
