const express = require('express');
const pool = require('../config/db');
const router = express.Router();

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const concertRoutes = require('./concertRoutes');
const bookingRoutes = require('./bookingRoutes')
const artistRoutes = require('./artistRoutes')

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/services', concertRoutes);
router.use('/booking',bookingRoutes);
router.use('/artists',artistRoutes)

//

module.exports = router;
