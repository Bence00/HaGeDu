const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth',   require('./routes/auth'));
app.use('/api/venues', require('./routes/venues'));
app.use('/api/events', require('./routes/events'));

// Globális hibakezelő
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Szerverhiba' });
});

module.exports = app;
