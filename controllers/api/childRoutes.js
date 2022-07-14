const router = require('express').Router();
const { User, Child, devMilestones, medMilestones } = require('../../models');

//Get all associated children to user
//TODO currently gets all children in the database; want to get all children associated w/ User ID
router.get('/', async (req, res) => {
    try {
        // res.send('<h1>Tiny Triumphs Landing Page</h1>');
        const childData = await Child.findAll({
            include: 
            [
                {
                    //Includes linked parent name only
                    model: User,
                    attributes: ['name'],
                },
                {
                    //Gets all med milestones
                    model: medMilestones,
                    // attributes: ['medMilestone']
                }
            ],
        });

        const children = childData.map((children) => children.get({ plain: true }));

        //TODO change to render when handlebars is functional
        res.send(children);
    } catch (err) {
    res.status(400).json(err);
    }
});

module.exports = router;