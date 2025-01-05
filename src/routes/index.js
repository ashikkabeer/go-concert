const express = require('express');
const pool = require('../config/db');
const router = express.Router();

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const concertRoutes = require('./concertRoutes');
// Example route
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/services', concertRoutes);

//

module.exports = router;
