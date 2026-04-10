const pool = require('../config/db');

async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

async function findByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0] || null;
}

async function create({ username, email, password }) {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  const [rows] = await pool.query(
    'SELECT id, username, email, role FROM users WHERE id = ?',
    [result.insertId]
  );
  return rows[0];
}

module.exports = { findByEmail, findByUsername, create };
