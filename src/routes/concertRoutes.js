const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const { createConcert, updateConcert, deleteConcert, softDeleteConcert } = require('../controllers/concertController');
// route to add new concerts

router.post('/', verifyTokenMiddleware, checkProfileOwnershipMiddleware, roleCheckMiddleware(['Service Provider', 'Admin']), createConcert);
router.get(
    '/:id',
    verifyTokenMiddleware,
    checkProfileOwnershipMiddleware,
    roleCheckMiddleware(['Service Provider', 'Admin', 'Customer']),
    deleteConcert // get the concert
);
router.get(
    '/',
    verifyTokenMiddleware,
    checkProfileOwnershipMiddleware,
    roleCheckMiddleware(['Service Provider', 'Admin', 'Customer']),
    deleteConcert
    // get all concert
);
router.delete('/:id', verifyTokenMiddleware, checkProfileOwnershipMiddleware, roleCheckMiddleware(['Service Provider', 'Admin']), softDeleteConcert);
router.put('/:id', verifyTokenMiddleware, checkProfileOwnershipMiddleware, roleCheckMiddleware(['Service Provider', 'Admin']), updateConcert);

//Description: Fetches available time slots for a specific service on a given date.
router.get('/:service_id/availability'); //Query Parameters: date: Date for which availability is requested.

module.exports = router;
