const express = require('express');
const pool = require('../config/db');
const router = express.Router();

const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
// Example route
router.use('/auth',authRoutes);
router.use('/users',userRoutes)
// 

module.exports = router;
