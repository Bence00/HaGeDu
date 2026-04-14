const router = require('express').Router();
const {
  getAll, getById,
  getLiked, addLike, removeLike,
} = require('../controllers/eventController');
const { authMiddleware } = require('../middleware/auth');

// Public
router.get('/',    getAll);

// Protected — must come before /:id to avoid route shadowing
router.get('/liked',            authMiddleware, getLiked);
router.post('/liked',           authMiddleware, addLike);
router.delete('/liked/:eventId', authMiddleware, removeLike);

// Public detail (after /liked to prevent shadowing)
router.get('/:id', getById);

module.exports = router;
