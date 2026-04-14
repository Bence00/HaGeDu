const pool = require('../config/db');

async function findAll({ category, dateFilter, q } = {}) {
  let sql = `
    SELECT e.id, e.title, e.description, e.category,
           e.date_time, e.address, e.image_url,
           e.source_url, e.source, e.price_info,
           v.id   AS venue_id,
           v.name AS venue_name
    FROM events e
    LEFT JOIN venues v ON e.venue_id = v.id
    WHERE 1=1
  `;
  const params = [];

  if (category && category !== 'all') {
    sql += ' AND e.category = ?';
    params.push(category);
  }

  if (dateFilter === 'today') {
    sql += ' AND DATE(e.date_time) = CURDATE()';
  } else if (dateFilter === 'week') {
    sql += ' AND e.date_time >= NOW() AND e.date_time < DATE_ADD(CURDATE(), INTERVAL 7 DAY)';
  } else if (dateFilter === 'month') {
    sql += ' AND e.date_time >= NOW() AND e.date_time < DATE_ADD(CURDATE(), INTERVAL 30 DAY)';
  } else {
    // Default: show all upcoming
    sql += ' AND e.date_time >= CURDATE()';
  }

  if (q) {
    sql += ' AND (e.title LIKE ? OR v.name LIKE ? OR e.address LIKE ?)';
    const like = `%${q}%`;
    params.push(like, like, like);
  }

  sql += ' ORDER BY e.date_time ASC';

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    `SELECT e.id, e.title, e.description, e.category,
            e.date_time, e.address, e.image_url,
            e.source_url, e.source, e.price_info,
            v.id   AS venue_id,
            v.name AS venue_name,
            v.tixa_url, v.ticketswap_url, v.bandsintown_url
     FROM events e
     LEFT JOIN venues v ON e.venue_id = v.id
     WHERE e.id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function count() {
  const [rows] = await pool.query('SELECT COUNT(*) AS total FROM events WHERE date_time >= CURDATE()');
  return rows[0].total;
}

module.exports = { findAll, findById, count };
