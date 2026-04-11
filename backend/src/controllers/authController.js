const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const userModel = require('../models/userModel');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Minden mező kitöltése kötelező' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Érvénytelen email cím' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'A jelszónak legalább 6 karakter hosszúnak kell lennie' });
    }

    if (await userModel.findByEmail(email)) {
      return res.status(400).json({ error: 'Ez az email cím már foglalt' });
    }
    if (await userModel.findByUsername(username)) {
      return res.status(400).json({ error: 'Ez a felhasználónév már foglalt' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user   = await userModel.create({ username, email, password: hashed });

    res.status(201).json({ message: 'Sikeres regisztráció', user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email és jelszó megadása kötelező' });
    }

    const user = await userModel.findByEmail(email);
    console.log('[login] email:', JSON.stringify(email), '| user found:', !!user);
    if (!user) {
      return res.status(401).json({ error: 'Hibás email cím vagy jelszó' });
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log('[login] password valid:', valid);
    if (!valid) {
      return res.status(401).json({ error: 'Hibás email cím vagy jelszó' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
