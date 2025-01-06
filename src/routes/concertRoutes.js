const { roleCheckMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const { createConcert, updateConcert, deleteConcert, softDeleteConcert } = require('../controllers/concertController');
// route to add new concerts

router.post('/', checkProfileOwnershipMiddleware, roleCheckMiddleware(['organizer', 'admin']), createConcert);
router.get(
    '/:id',

    checkProfileOwnershipMiddleware,
    roleCheckMiddleware(['organizer', 'admin', 'customer']),
    deleteConcert // get the concert
);
router.get(
    '/',

    checkProfileOwnershipMiddleware,
    roleCheckMiddleware(['organizer', 'admin', 'customer']),
    deleteConcert
    // get all concert
);
router.delete('/:id', checkProfileOwnershipMiddleware, roleCheckMiddleware(['organizer', 'admin']), softDeleteConcert);
router.put('/:id', checkProfileOwnershipMiddleware, roleCheckMiddleware(['organizer', 'admin']), updateConcert);

//Description: Fetches available time slots for a specific service on a given date.
router.get('/:service_id/availability'); //Query Parameters: date: Date for which availability is requested.

module.exports = router;
