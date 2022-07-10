const router = require('express').Router();

//TODO - Render ALL COMPLETED milestones and appointments
router.get('/', async (req, res) => {
    try {

    } catch (err) {
    res.status(400).json(err);
    }
});

module.exports = router;