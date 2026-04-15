const router = require('express').Router();
const { getAll, getById, getFavorites, addFavorite, removeFavorite } = require('../controllers/venueController');
const { authMiddleware } = require('../middleware/auth');

// Public — anyone can browse venues
router.get('/', getAll);

// Protected — only logged-in users
router.get('/favorites',           authMiddleware, getFavorites);
router.post('/favorites',          authMiddleware, addFavorite);
router.delete('/favorites/:venueId', authMiddleware, removeFavorite);

router.get('/:venueId', getById);

module.exports = router;
