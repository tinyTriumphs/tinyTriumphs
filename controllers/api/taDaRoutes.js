const router = require('express').Router();
const { Child, devMilestones, medMilestones } = require('../../models');

// the '/api/tada' endpoint

//TODO - Render ALL COMPLETED milestones and appointments
router.get('/', async (req, res) => {
    try {
        const taDaData = await Child.findAll({
            include: [
                {
                    model: devMilestones,
                    attributes: ['id', 'devMilestone', 'devMilestone_complete', 'devMilestone_expectedDate', 'devMilestone_expectedRange', 'devMilestone_dateComplete', 'child_id'],
                    where: {
                        devMilestone_complete: true
                    }
                }
            ]
        });
        res.status(200).json(taDaData);
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const taDaData = await Child.findByPk(req.params.id, {
            include: [
                {
                    model: devMilestones,
                    where: {
                        devMilestone_complete: true
                    }
                },
                {
                    model: medMilestones,
                    where: {
                        medMilestone_complete: true
                    }
                }
            ]
        });
        res.status(200).json(taDaData);
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;