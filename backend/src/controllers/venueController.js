const venueModel    = require('../models/venueModel');
const favoriteModel = require('../models/favoriteModel');

async function getAll(req, res, next) {
  try {
    const venues = await venueModel.findAll();
    res.json(venues);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const venueId = Number(req.params.venueId);
    if (!Number.isInteger(venueId) || venueId < 1) {
      return res.status(400).json({ error: 'Érvénytelen helyszín azonosító' });
    }

    const venue = await venueModel.findById(venueId);
    if (!venue) {
      return res.status(404).json({ error: 'Helyszín nem található' });
    }

    res.json(venue);
  } catch (err) {
    next(err);
  }
}

async function getFavorites(req, res, next) {
  try {
    const venues = await favoriteModel.findByUser(req.user.id);
    res.json(venues);
  } catch (err) {
    next(err);
  }
}

async function addFavorite(req, res, next) {
  try {
    const { venue_id } = req.body;
    if (!venue_id) {
      return res.status(400).json({ error: 'venue_id megadása kötelező' });
    }

    // Check venue exists
    const venue = await venueModel.findById(venue_id);
    if (!venue) {
      return res.status(404).json({ error: 'Helyszín nem található' });
    }

    // Ignore duplicate saves
    if (await favoriteModel.exists(req.user.id, venue_id)) {
      return res.status(409).json({ error: 'Már mentve van' });
    }

    await favoriteModel.create(req.user.id, venue_id);
    res.status(201).json({ message: 'Mentve' });
  } catch (err) {
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const venueId = parseInt(req.params.venueId, 10);
    if (isNaN(venueId)) {
      return res.status(400).json({ error: 'Érvénytelen venue_id' });
    }
    await favoriteModel.remove(req.user.id, venueId);
    res.json({ message: 'Törölve' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, getFavorites, addFavorite, removeFavorite };
