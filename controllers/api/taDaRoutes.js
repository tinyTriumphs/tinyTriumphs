const router = require('express').Router();
const { Child, devMilestones } = require('../../models');

// the '/api/tada' endpoint

//TODO - Render ALL COMPLETED milestones and appointments
router.get('/', async (req, res) => {
    try {
        const taDaData = await Development.findAll({
            include: [
                {
                    model: 
                }
            ]
        })
    } catch (err) {
    res.status(400).json(err);
    }
});

module.exports = router;