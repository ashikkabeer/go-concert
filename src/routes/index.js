const router = require('express').Router();
const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

const artistRoutes = require('./artistRoutes');
const authRoutes = require('./authRoutes');
const bookingRoutes = require('./bookingRoutes');
const concertRoutes = require('./concertRoutes');
const genreRoutes = require('./genreRoutes');
const paymentRoutes = require('./paymentRoutes');
const ticketRoutes = require('./ticketRoutes');
const userRoutes = require('./userRoutes');
const venueRoutes = require('./venueRoutes');

router.use('/artists', verifyTokenMiddleware, artistRoutes);
router.use('/auth', authRoutes);
router.use('/booking', verifyTokenMiddleware, bookingRoutes);
router.use('/concerts', verifyTokenMiddleware, concertRoutes);
router.use('/genres', verifyTokenMiddleware, genreRoutes);
router.use('/payments', verifyTokenMiddleware, paymentRoutes);
router.use('/tickets', verifyTokenMiddleware, ticketRoutes);
router.use('/users', verifyTokenMiddleware, userRoutes);
router.use('/venues', verifyTokenMiddleware, venueRoutes);
module.exports = router;
