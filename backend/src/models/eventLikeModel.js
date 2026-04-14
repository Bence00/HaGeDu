const pool = require('../config/db');

async function findByUser(userId) {
  const [rows] = await pool.query(
    `SELECT e.id, e.title, e.category, e.date_time,
            e.address, e.image_url, e.source_url,
            e.source, e.price_info,
            v.name AS venue_name
     FROM event_likes el
     JOIN   events e  ON el.event_id = e.id
     LEFT JOIN venues v ON e.venue_id = v.id
     WHERE el.user_id = ?
     ORDER BY el.created_at DESC`,
    [userId]
  );
  return rows;
}

async function exists(userId, eventId) {
  const [rows] = await pool.query(
    'SELECT 1 FROM event_likes WHERE user_id = ? AND event_id = ?',
    [userId, eventId]
  );
  return rows.length > 0;
}

async function create(userId, eventId) {
  await pool.query(
    'INSERT INTO event_likes (user_id, event_id) VALUES (?, ?)',
    [userId, eventId]
  );
}

async function remove(userId, eventId) {
  await pool.query(
    'DELETE FROM event_likes WHERE user_id = ? AND event_id = ?',
    [userId, eventId]
  );
}

module.exports = { findByUser, exists, create, remove };
