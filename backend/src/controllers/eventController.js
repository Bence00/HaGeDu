const eventModel     = require('../models/eventModel');
const eventLikeModel = require('../models/eventLikeModel');

async function getAll(req, res, next) {
  try {
    const { category, date, q } = req.query;
    const events = await eventModel.findAll({ category, dateFilter: date, q });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Érvénytelen azonosító' });

    const event = await eventModel.findById(id);
    if (!event) return res.status(404).json({ error: 'Esemény nem található' });

    res.json(event);
  } catch (err) {
    next(err);
  }
}

async function getLiked(req, res, next) {
  try {
    const events = await eventLikeModel.findByUser(req.user.id);
    res.json(events);
  } catch (err) {
    next(err);
  }
}

async function addLike(req, res, next) {
  try {
    const { event_id } = req.body;
    if (!event_id) return res.status(400).json({ error: 'event_id megadása kötelező' });

    const event = await eventModel.findById(event_id);
    if (!event) return res.status(404).json({ error: 'Esemény nem található' });

    if (await eventLikeModel.exists(req.user.id, event_id)) {
      return res.status(409).json({ error: 'Már kedvelve van' });
    }

    await eventLikeModel.create(req.user.id, event_id);
    res.status(201).json({ message: 'Érdekel jelölve' });
  } catch (err) {
    next(err);
  }
}

async function removeLike(req, res, next) {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    if (isNaN(eventId)) return res.status(400).json({ error: 'Érvénytelen event_id' });

    await eventLikeModel.remove(req.user.id, eventId);
    res.json({ message: 'Jelölés törölve' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, getLiked, addLike, removeLike };
