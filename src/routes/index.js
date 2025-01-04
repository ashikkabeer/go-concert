const express = require('express');
const pool = require('../config/db');
const router = express.Router();

const userRoutes = require('./userRoutes')
// Example route
router.use('/auth',userRoutes);
// 

module.exports = router;
