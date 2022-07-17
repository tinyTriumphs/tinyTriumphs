const router = require('express').Router();
const { Child, devMilestones } = require('../../models');
const withAuth = require('../../utils/auth');

// the '/api/tada' endpoint

//TODO - Render ALL COMPLETED milestones
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

// render all completed milestones by USER's Children
router.get('/:user_id', withAuth, async (req, res) => {
    try {
        const tadaData = await Child.findAll({
            where: {
                user_id: req.session.user_id
            },
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
        if (!tadaData) {
            res.status(404).json({ message: "No completed TaDa's found with this user!" });
            return;
        }
        res.status(200).json(tadaData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;